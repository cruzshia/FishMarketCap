import { PropsWithChildren } from 'react'
import { Global, css } from '@emotion/react'
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <MUIThemeProvider
      theme={createTheme({
        palette: {
          primary: {
            main: '#82d116'
          }
        }
      })}
    >
      <Global
        styles={css`
          * {
            font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
              sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
          }
          table {
            border-spacing: 0;
          }
        `}
      />
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  )
}

export default ThemeProvider
