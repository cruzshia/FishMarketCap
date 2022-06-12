import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import store from './providers/store'
import ThemeProvider from './providers/theme'
import AppRoutes from './AppRoutes'
import './i18n'

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider>
          <Suspense
            fallback={
              <Box
                sx={{
                  width: 'fit-content',
                  m: '40px auto'
                }}
              >
                <CircularProgress />
              </Box>
            }
          >
            <AppRoutes />
          </Suspense>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  )
}

export default App
