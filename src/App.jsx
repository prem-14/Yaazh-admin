import { useMemo, useState } from 'react'
import { muiThemeSettings } from './theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'

import SampleButton from '@/components/SampleButton'
import SampleText from '@/components/SampleText'
import SampleInput from '@/components/SampleInput'

function App() {
  const [mode, setMode] = useState('dark')
  const theme = useMemo(() => createTheme(muiThemeSettings(mode)), [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SampleButton mode={mode} setMode={setMode} />
      <br />
      <SampleInput />
      <br />
      <SampleText />
    </ThemeProvider>
  )
}

export default App
