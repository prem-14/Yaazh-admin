import React from 'react'
import TextField from '@mui/material/TextField'

const CustomMultiSelect = (props) => {
  return (
    <TextField
      select
      name={props.name}
      id={props.id}
      variant='outlined'
      size={props.size}
      disabled={props.disabled}
      onBlur={props.onBlur || props.onBlur}
      label={props.label}
      placeholder={props.placeholder}
      error={props.error}
      helperText={props.helperText}
      SelectProps={{
        multiple: true,
        value: props.value,
        onChange: props.onChange,
        renderValue: (selected) => {
          let toShow = []
          props.options
            ?.filter((opt) => (selected.length ? selected.includes(opt.value) : true))
            .map((item) => {
              toShow.push(item.show)
              return true
            })

          return toShow.join(', ')
        },
      }}
    >
      {props.children}
    </TextField>
  )
}

export default CustomMultiSelect
