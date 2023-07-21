import React, { useState } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Divider, MenuItem } from '@mui/material'

const CustomSelect = (props) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth error={props.error}>
        <InputLabel id='demo-simple-select-label'>{props.label}</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          name={props.name}
          value={props.value}
          label={props.label}
          onChange={props.onChange}
        >
          {props.children}
        </Select>
      </FormControl>
    </Box>
  )
}

export default CustomSelect
