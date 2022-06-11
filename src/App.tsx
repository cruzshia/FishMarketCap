import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './providers/store'
import Layout from './components/Layout'
import './i18n'
import { useTranslation } from 'react-i18next'

const Home = lazy(() => import('./features/Home'))

function App() {
  const { t } = useTranslation()

  return (
    <BrowserRouter>
      <Provider store={store}>
        {t('welcome')}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
            </Route>
            <Route path='*' element={<div>404 not found</div>} />
          </Routes>
        </Suspense>
      </Provider>
    </BrowserRouter>
  )
}

export default App
