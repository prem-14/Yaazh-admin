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
          <Route path='products' element={<Product />} />
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
