import { useMemo, useState } from 'react'
import { muiThemeSettings } from './theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Dashboard from './views/Dashboard'

function App() {
  const [mode, setMode] = useState('dark')
  const theme = useMemo(() => createTheme(muiThemeSettings(mode)), [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            path='*'
            element={<Dashboard mode={mode} setMode={setMode} />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
