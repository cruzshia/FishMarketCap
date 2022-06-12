import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

const Home = lazy(() => import('./features/Home'))
const Exchange = lazy(() => import('./features/Exchange'))

export const ROUTE_PATH = {
  HOME: '/',
  EXHCANGE: '/exchange/:id'
}

function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTE_PATH.HOME} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={ROUTE_PATH.EXHCANGE} element={<Exchange />} />
      </Route>
      <Route path='*' element={<div>404 not found</div>} />
    </Routes>
  )
}

export default AppRoutes
