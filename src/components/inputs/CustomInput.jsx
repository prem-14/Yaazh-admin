import React from 'react'
import TextField from '@mui/material/TextField'

function CustomInput(props) {
  return (
    <div className='customInput'>
      <TextField
        value={props.value}
        autoFocus={props.autoFocus}
        name={props.name}
        onChange={props.onChange}
        onBlur={props.onBlur}
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
      />
    </div>
  )
}

export default CustomInput
