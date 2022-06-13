import { useState, useCallback } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import GTranslateIcon from '@mui/icons-material/GTranslate'
import SetMealIcon from '@mui/icons-material/SetMeal'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import i18n from '@/i18n'

const HEAD_COLOR = '#FFF'

function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const handleSelect = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      i18n.changeLanguage(e.currentTarget.dataset['value'])
      handleClose()
    },
    [handleClose]
  )

  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          disableRipple={true}
          disableFocusRipple={true}
          aria-label='logo'
          sx={{ mr: 2 }}
        >
          <SetMealIcon sx={{ color: HEAD_COLOR }} />
          <Typography variant='h1' fontSize='18px' fontWeight={500} color={HEAD_COLOR} sx={{ ml: '4px' }}>
            Fish.MarketCap
          </Typography>
        </IconButton>
        <Typography variant='subtitle1' component='div' sx={{ flexGrow: 1, pl: '20px' }} />
        <div>
          <IconButton disableRipple={true} disableFocusRipple={true} data-cy='lang-selector' onClick={handleClick}>
            <GTranslateIcon sx={{ color: HEAD_COLOR }} />
          </IconButton>
          <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
          >
            <MenuItem onClick={handleSelect} data-value='en'>
              English
            </MenuItem>
            <MenuItem onClick={handleSelect} data-value='zh-TW'>
              繁體中文
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
