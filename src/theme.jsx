const themes = (mode) => {
  let themePalette
  if (mode === 'light') {
    themePalette = {
      // palette values for light mode
      primary: {
        main: '#23B7C6',
        contrastText: '#fff',
      },
      secondary: {
        main: '#5b7083',
        contrastText: '#fff',
      },
      background: {
        default: 'rgb(255, 255, 255)',
      },
      text: {
        primary: 'rgb(15, 20, 25)',
        secondary: '#5b7083',
      },
    }
  } else if (mode === 'dark') {
    themePalette = {
      // palette values for dark mode
      primary: {
        main: '#23B7C6',
        contrastText: '#fff',
      },
      secondary: {
        main: '#5b7083',
        contrastText: '#fff',
      },
      background: {
        default: 'rgb(21, 32, 43)',
      },
      text: {
        primary: 'rgb(255, 255, 255)',
        secondary: '#8899a6',
      },
    }
  }
  rootThemeSettings(themePalette)
  return themePalette
}

function rootThemeSettings(themePalette) {
  Object.entries(themePalette).forEach(([key, value]) => {
    const keys = Object.keys(value)
    keys.forEach((k) => {
      // console.log(`--${key}${k.charAt(0).toUpperCase()}${k.slice(1)}`) // {primary: {main: "#23B7C6"}} ===> "primaryMain: "#23B7C6
      // document.documentElement.style.setProperty('--primaryMain', "#23B7C6");

      document.documentElement.style.setProperty(
        `--${key}${k.charAt(0).toUpperCase()}${k.slice(1)}`,
        themePalette[key][k]
      )
    })
  })
}

// mui theme settings (https://mui.com/material-ui/customization/default-theme/)
export const muiThemeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...themes(mode),
    },
    typography: {
      fontFamily: ['Inter', 'sans-serif'].join(','),
      body1: {
        fontSize: '1.5rem',
      },
      button: {
        fontSize: '1.2rem',
      },
    },
  }
}
