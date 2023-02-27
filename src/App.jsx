import { useMemo, useState } from 'react'
import { muiThemeSettings } from './theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Dashboard from './views/Dashboard'
import AlerNotification from './components/AlertNotification'
import Product from './views/Product'

function App() {
  const [mode, setMode] = useState('dark')
  const theme = useMemo(() => createTheme(muiThemeSettings(mode)), [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AlerNotification />
      <BrowserRouter>
        <Routes>
          <Route
            path='products'
            element={<Product mode={mode} setMode={setMode} />}
          />
          <Route path='*' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
