import { Button } from '@mui/material'
import React from 'react'
import { styled } from '@mui/system'

const MyButton = styled(Button)({
  borderRadius: '100px',
  fontSize: '1rem',
})

const SampleButton = ({ mode, setMode }) => {
  return (
    <div>
      <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
        {mode}
      </button>
      <MyButton variant='contained'>Text</MyButton>
      <Button variant='contained'>Contained</Button>
      <Button color='secondary' variant='contained'>
        Outlined
      </Button>
    </div>
  )
}

export default SampleButton
