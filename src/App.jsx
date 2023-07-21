import { useEffect, useMemo } from 'react'
import { muiThemeSettings } from './theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import AlerNotification from './components/AlertNotification'
import { useSelector } from 'react-redux'
import Router from '@/routes'
import { useLoadAdminQuery } from './store/apis/authApis'
import '@/socket'
import { useAllValuesQuery } from './store/apis/commonApis'
import LeafLoader from './components/LeafLoader'

function App() {
  const mode = useSelector((state) => state.global.mode)
  const theme = useMemo(() => createTheme(muiThemeSettings(mode)), [mode])
  const { data, error, isFetching } = useLoadAdminQuery()
  useAllValuesQuery()

  if (isFetching) {
    return <LeafLoader />
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AlerNotification />
      <Router />
    </ThemeProvider>
  )
}

export default App
