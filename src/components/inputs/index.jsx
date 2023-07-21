import './index.css'
import CustomInput from './CustomInput'
import CustomEditor from './CustomEditor'
import CustomSelect from './CustomSelect'
import CustomCheckBox from './CustomCheckbox'
import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  ListItemText,
  MenuItem,
  Switch,
} from '@mui/material'
import CKEditor from 'ckeditor4-react'
import CustomRadio from './CustomRadio'
import CustomImageUploads from './CustomImageUploads'
import CustomMultiSelect from './CustomMultiSelect'
import CustomAutocomplete from './CustomAutoComplete'

const helperText = (data, formik) => {
  if (data.touchedError === false) {
    // doesn't require to touch the input field to get the validation error message
    return data.filter ? formik?.errors?.filters?.[data.name] : formik?.errors?.[data.name]
  }
  return data.filter
    ? formik?.touched?.filters?.[data.name] && formik?.errors?.filters?.[data.name]
    : formik?.touched?.[data.name] && formik?.errors?.[data.name]
}

const errorCheck = (data, formik) => {
  return helperText(data, formik) ? true : false
}

const defaultSelect = (data, formik) => {
  if (data.filter) {
    if (
      typeof formik.values.filters[data.name].value !== 'string' &&
      typeof formik.values.filters[data.name].value !== 'number'
    ) {
      formik.values.filters[data.name].value = ''
    }
  } else {
    if (typeof formik.values[data.name] !== 'string' && typeof formik.values[data.name] !== 'number') {
      formik.values[data.name] = ''
    }
  }
}

const defaultMultiSelect = (data, formik) => {
  if (data.filter) {
    if (!Array.isArray(formik.values.filters[data.name].value)) {
      formik.values.filters[data.name].value = []
    }
  } else {
    if (!Array.isArray(formik.values[data.name])) {
      formik.values[data.name] = []
    }
  }
}

const multiSelectValue = (data, formik) => {
  defaultMultiSelect(data, formik)

  return data.filter
    ? formik.values.filters[data.name].value.length <= data.options.length
      ? data.options
          .filter((d) =>
            formik.values.filters[data.name].value.length
              ? !formik.values.filters[data.name].value.includes(d.value)
              : true
          )
          .map((d) => d.value)
      : (formik.values.filters[data.name].value.length = 0 && null)
    : formik.values[data.name].length <= data.options.length
    ? data.options
        .filter((d) => (formik.values[data.name].length ? !formik.values[data.name].includes(d.value) : true))
        .map((d) => d.value)
    : (formik.values[data.name].length = 0 && null)
}

function formatCategories(categories, data, formik, checkbox = false, indentLevel = 0) {
  const menuItems = []
  categories.forEach((category) => {
    menuItems.push(
      <MenuItem key={category.id} value={category.id}>
        <div className='nested' style={{ marginLeft: indentLevel * 20 + 'px' }}>
          {checkbox && (
            <Checkbox
              checked={
                data.filter
                  ? formik?.values?.filters[data.name].value?.indexOf(category.id) > -1
                  : formik?.values[data.name]?.indexOf(category.id) > -1
              }
              onChange={data.onChange ? data.onChange : formik.handleChange}
            />
          )}
          {category.name}
        </div>
      </MenuItem>
    )

    if (category.subCate) {
      const subMenuItems = formatCategories(category.subCate, data, formik, checkbox, indentLevel + 1)
      menuItems.push(...subMenuItems)
    }
    if (indentLevel === 0) {
      menuItems.push(<Divider key={`divider-${category.id}`} />)
    }
  })
  return menuItems
}

function inputData(formik, formikArray) {
  let data = formikArray.map((data, index) => (
    <div key={index} className={data.class}>
      {['text', 'password', 'color', 'date', 'time', 'datetime', 'textarea'].includes(data.type) ? (
        <>
          <CustomInput
            id={data.id}
            value={data.filter ? formik.values.filters[data.name].value : formik.values[data.name]}
            autoFocus={data.autoFocus}
            name={data.filter ? `filters.${data.name}.value` : data.name}
            disabled={data.disabled}
            // onBlur={formik.handleBlur}
            // onBlur={data.onBlurEvent ? formik.handleBlur : undefined}
            onBlurEvent={data.onBlurEvent}
            onChange={data.onChangeEvent === false ? undefined : data.onChange ? data.onChange : formik.handleChange}
            label={data.label}
            placeholder={data.placeholder}
            type={data.type}
            variant={data.variant}
            color={data.color}
            size={data.size}
            startAdornment={data.startAdornment}
            endAdornment={data.endAdornment}
            min={data.min}
            max={data.max}
            error={errorCheck(data, formik)}
            helperText={helperText(data, formik)}
            inputStyle={data.inputStyle}
            upperLabel={data.upperLabel}
            tooltiptitle={data.tooltiptitle}
            readonly={data.readonly}
            rows={data.rows}
            multiline={data.multiline}
            formik={formik}
          />
        </>
      ) : data.type === 'editor' ? (
        <>
          <CustomEditor formik={formik} data={data} />
        </>
      ) : data.type === 'checkboxarray' ? (
        <>
          <div className='flex align-center flex-wrap'>
            {data.options &&
              data.options.map((opt, optindex) => (
                <CustomCheckBox
                  key={optindex}
                  name={data.name}
                  disabled={data.disabled}
                  label={opt.description}
                  checked={formik.values[data.name].indexOf(opt.id.toString()) !== -1 ? true : false}
                  value={opt.id.toString()}
                  onChange={formik.handleChange}
                />
              ))}
          </div>
          <div>
            <FormHelperText error>
              {formik.errors[data.name] && formik.touched[data.name] && formik.errors[data.name]}
            </FormHelperText>
          </div>
        </>
      ) : data.type === 'ckeditor' ? (
        <>
          {data.label && <div style={{ fontWeight: '500' }}>{data.label}</div>}
          <CKEditor
            config={{
              allowedContent: true,
            }}
            type='classic'
            initData={formik.values[data.name] || ''}
            onChange={({ editor }) => {
              formik.setFieldValue(data.name, editor.getData())
            }}
            disableEnforceFocus
            onInstanceReady={({ editor }) => {
              editor.setData(formik.values[data.name] || '')
            }}
          />
          <div>
            <FormHelperText error>
              {formik.errors[data.name] && formik.touched[data.name] && formik.errors[data.name]}
            </FormHelperText>
          </div>
        </>
      ) : data.type === 'select' ? (
        <>
          {defaultSelect(data, formik)}
          <CustomSelect
            label={data.label}
            value={data.filter ? formik.values.filters[data.name].value : formik.values[data.name]}
            name={data.filter ? `filters.${data.name}.value` : data.name}
            onChange={data.onChange ? data.onChange : formik.handleChange}
            error={formik.errors[data.name] && formik.touched[data.name] ? true : false}
          >
            {data.nested
              ? [
                  <MenuItem key={0} value={0}>
                    <div className='nested' style={{ marginLeft: '0px' }}>
                      Top level Category
                    </div>
                  </MenuItem>,
                  <Divider />,
                  formatCategories(data.options),
                ]
              : data.options &&
                data.options.map((opt, optindex) => (
                  <MenuItem key={optindex} value={opt.value}>
                    {opt.show}
                  </MenuItem>
                ))}
          </CustomSelect>
          {formik.errors[data.name] && formik.touched[data.name] && (
            <div>
              <FormHelperText error>{formik.errors[data.name]}</FormHelperText>
            </div>
          )}
        </>
      ) : data.type === 'radio' ? (
        <>
          <CustomRadio
            error={formik.touched[data.name] && formik.errors[data.name]}
            title={data.title}
            name={data.filter ? `filters.${data.name}.value` : data.name}
            items={data.item}
            value={data.filter ? formik.values.filters[data.name].value : formik.values[data.name]}
            onChange={data.onChange ? data.onChange : formik.handleChange}
            int={data.int}
          />
        </>
      ) : data.type === 'imageUploads' ? (
        <>
          <CustomImageUploads
            formik={formik}
            label={data.label}
            labelDesc={data.labelDesc}
            name={data.name}
            multiple={data.multiple}
            accept={data.accept}
            value={formik.values[data.name]}
            info={data.info || { from: 'unknown', id: 0 }}
          />
          {formik.errors[data.name] && formik.touched[data.name] && (
            <div>
              <FormHelperText error>{formik.errors[data.name]}</FormHelperText>
            </div>
          )}
        </>
      ) : data.type === 'switch' ? (
        <>
          <FormGroup row>
            <FormControlLabel
              label={data.label}
              control={
                <Switch
                  checked={formik.values[data.name]}
                  onChange={formik.handleChange}
                  name={data.name}
                  color={data.color}
                />
              }
            />
          </FormGroup>

          {formik.errors[data.name] && formik.touched[data.name] && (
            <div>
              <FormHelperText error>{formik.errors[data.name]}</FormHelperText>
            </div>
          )}
        </>
      ) : data.type === 'multiselect' ? (
        <>
          {defaultMultiSelect(data, formik)}
          <CustomMultiSelect
            label={data.label}
            id={data.id}
            value={data.filter ? formik.values.filters[data.name].value : formik.values[data.name]}
            autoFocus={data.autoFocus}
            name={data.filter ? `filters.${data.name}.value` : data.name}
            onChange={(event, value) => {
              let arrayValue = event.target.value.flat()
              let allLength = data.filter
                ? formik.values.filters[data.name].value.length === data.options.length
                : formik.values[data.name].length === data.options.length
              if (allLength && arrayValue.length === data.options.length) {
                arrayValue = []
              }
              data.filter
                ? formik.setFieldValue(`filters.${data.name}.value`, arrayValue)
                : formik.setFieldValue(data.name, arrayValue)
            }}
            placeholder={data.placeholder}
            onBlur={formik.handleBlur}
            disabled={data.disabled}
            type={data.type}
            error={errorCheck(data, formik)}
            helperText={helperText(data, formik)}
            options={data.options}
          >
            {data.selectAllOption !== false && (
              <MenuItem value={multiSelectValue(data, formik)}>
                <Checkbox
                  checked={
                    data.filter
                      ? formik.values.filters[data.name].value?.length === data.options.length
                        ? true
                        : false
                      : formik.values[data.name]?.length === data.options.length
                      ? true
                      : false
                  }
                  onChange={(val) => {
                    val.target.checked
                      ? data.filter
                        ? formik.setFieldValue(
                            `filters.${data.name}.value`,
                            formik.values.filters[data.name].value.concat(multiSelectValue(data, formik))
                          )
                        : formik.setFieldValue(
                            data.name,
                            formik.values[data.name].concat(multiSelectValue(data, formik))
                          )
                      : data.filter
                      ? formik.setFieldValue(`filters.${data.name}.value`, [])
                      : formik.setFieldValue(data.name, [])
                  }}
                />
                <ListItemText primary={'All'} />
              </MenuItem>
            )}
            {data.nested
              ? formatCategories(data.nestedOptions, data, formik, true)
              : data.options.map((opt, optindex) => (
                  <MenuItem key={optindex} value={opt.value}>
                    <Checkbox
                      checked={
                        data.filter
                          ? formik?.values?.filters[data.name].value?.indexOf(opt.value) > -1
                          : formik?.values[data.name]?.indexOf(opt.value) > -1
                      }
                      onChange={data.onChange ? data.onChange : formik.handleChange}
                    />
                    {opt.show}
                  </MenuItem>
                ))}
          </CustomMultiSelect>
        </>
      ) : data.type === 'autocomplete' ? (
        <>
          <CustomAutocomplete
            label={data.label}
            id={data.id}
            value={data.filter ? formik.values.filters[data.name].value : formik.values[data.name]}
            autoFocus={data.autoFocus}
            name={data.filter ? `filters.${data.name}.value` : data.name}
            size={data.size}
            onChange={(val) => {
              data.filter
                ? formik.setFieldValue(`filters.${data.name}.value`, val)
                : formik.setFieldValue(data.name, val)
            }}
            placeholder={data.placeholder}
            disabled={data.disabled}
            onBlur={formik.handleBlur}
            options={data.options}
            type={data.type}
            isOptionEqualToValue={(option, value) => option.code === value}
            error={errorCheck(data, formik)}
            helperText={helperText(data, formik)}
          />
        </>
      ) : null}
    </div>
  ))

  return data
}

export default inputData
