import React from 'react'
import TextField from '@mui/material/TextField'

function CustomInput(props) {
  const handleBlur = (e) => {
    if (props.onBlurEvent) {
      props.formik.setFieldValue(props.name, e.target.value)
    }
    props.formik.handleBlur(e)
  }
  return (
    <div className='customInput'>
      <TextField
        // value={props.value}
        autoFocus={props.autoFocus}
        name={props.name}
        onChange={props.onChange}
        onBlur={handleBlur}
        InputProps={{
          startAdornment: props.startAdornment,
          endAdornment: props.endAdornment,
          readOnly: props.readonly,
          inputProps: {
            min: props.min,
            max: props.max,
          },
        }}
        id={props.id}
        label={props.label}
        type={props.type === 'datetime' ? 'datetime-local' : props.type}
        size={props.size}
        disabled={props.disabled}
        variant={props.variant || 'outlined'}
        placeholder={props.placeholder}
        error={props.error}
        helperText={props.helperText}
        color={props.color || 'primary'}
        {...(!props.onBlurEvent && { value: props.value })}
        // {...(props.onBlurEvent && { onBlur: handleBlur })}
      />
    </div>
  )
}

export default CustomInput
