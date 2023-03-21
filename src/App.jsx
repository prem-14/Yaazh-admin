import { useMemo, useState } from 'react'
import { muiThemeSettings } from './theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Dashboard from './views/Dashboard'
import AlerNotification from './components/AlertNotification'
import DummyThunk from './views/DummyThunk'
import DummyRTKQ from './views/DummyRTKQ'
import { useSelector } from 'react-redux'

function App() {
  const mode = useSelector((state) => state.global.mode)
  const theme = useMemo(() => createTheme(muiThemeSettings(mode)), [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AlerNotification />
      <BrowserRouter>
        <Routes>
          {/* <Route path='*' element={<Dashboard />} /> */}
          {/* <Route path='*' element={<DummyThunk />} />  */}
          <Route path='*' element={<DummyRTKQ />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
