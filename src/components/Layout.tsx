import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'
import Header from './Header'

function Layout() {
  return (
    <>
      <Header />
      <Box sx={{ p: '20px 10px' }}>
        <Outlet />
      </Box>
    </>
  )
}

export default Layout
