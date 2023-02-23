import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'

function stringToColor(string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */
  console.log(string, color)
  return color
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      cursor: 'pointer',
      fontSize: '1.9rem',
    },
    children:
      name.split(' ').length > 1
        ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
        : `${name.split(' ')[0][0]}`,
  }
}

export default function CustomAvatar({ text, ...rest }) {
  return <Avatar {...stringAvatar(text)} {...rest} />
}
