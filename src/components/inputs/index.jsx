import './index.css'
import CustomInput from './CustomInput'
import CustomEditor from './CustomEditor'

const checkArrayHelperText = (formik, data) => {
  if (data.name.includes('[')) {
    let temp = data.name
    let objProperty = temp.split('.')[1]
    let arr = temp.split('[')
    let arrayName = arr[0]
    let arrayIndex = arr[1][0]
    return (
      formik.touched &&
      formik.touched[arrayName] &&
      formik.touched[arrayName][arrayIndex] &&
      formik.touched[arrayName][arrayIndex][objProperty] &&
      formik.errors &&
      formik.errors[arrayName] &&
      formik.errors[arrayName][arrayIndex] &&
      formik.errors[arrayName][arrayIndex][objProperty]
    )
  } else {
    return formik.touched[data.name] && formik.errors[data.name]
  }
}

const checkArrayText = (formik, data) => {
  if (data.name.includes('[')) {
    let temp = data.name
    let objProperty = temp.split('.')[1]
    let arr = temp.split('[')
    let arrayName = arr[0]
    let arrayIndex = arr[1][0]
    return formik.values[arrayName][arrayIndex][objProperty]
  } else {
    return formik.values[data.name]
  }
}

const helperText = (data, formik) => {
  return data.filter &&
    formik &&
    formik.touched &&
    formik.touched.filters &&
    formik.touched.filters[data.name] &&
    formik.errors &&
    formik.errors.filters &&
    formik.errors.filters[data.name]
    ? formik.errors.filters[data.name]
    : checkArrayHelperText(formik, data)
}

const errorCheck = (data, formik) => {
  return data.filter &&
    formik &&
    formik.touched &&
    formik.touched.filters &&
    formik.touched.filters[data.name] &&
    formik.errors &&
    formik.errors.filters &&
    formik.errors.filters[data.name]
    ? formik.errors.filters[data.name]
    : formik.touched[data.name] && formik.errors[data.name]
}

function inputData(formik, formikArray) {
  let data = formikArray.map((data, index) => (
    <div key={index} className={data.class}>
      {['text', 'password', 'color', 'date', 'time', 'datetime'].includes(data.type) ? (
        <>
          <CustomInput
            id={data.id}
            value={data.filter ? formik.values.filters[data.name].value : checkArrayText(formik, data)}
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
            helperText={helperText(data, formik) ? helperText(data, formik) : data.helperText}
            inputStyle={data.inputStyle}
            upperLabel={data.upperLabel}
            tooltiptitle={data.tooltiptitle}
            readonly={data.readonly}
            formik={formik}
          />
        </>
      ) : data.type === 'editor' ? (
        <>
          <CustomEditor formik={formik} data={data} />
        </>
      ) : null}
    </div>
  ))

  return data
}

export default inputData
