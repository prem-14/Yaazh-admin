import React, { useState } from 'react'
import { AppBar, IconButton } from '@mui/material'
import { styled } from '@mui/system'
import YaazhLogo from '@/assets/img/logo.png'
import { DarkMode, LightMode, Notifications } from '@mui/icons-material'
import Avatar from '../Avatar'
import CustomPopover from '../PopOver'

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.alt,
  position: 'unset',
  backgroundImage: 'none',
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: `0 5px 15px ${theme.palette.common.shadow}`,
  color: theme.palette.text.primary,
  transition: 'none',
}))

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  return (
    <CustomAppBar>
      <div className='flex justify-between align-center p-10'>
        <div className='flex align-center'>
          <img src={YaazhLogo} alt='react_logo' width='80' height='80' />
          <h3 className='ml-5 textSecondary'>Yaazh Admin</h3>
        </div>
        <div className='flex align-center'>
          <div>
            <IconButton>
              <DarkMode fontSize='large' color='secondary' />
            </IconButton>
          </div>
          <div className='ml-10'>
            <IconButton>
              <Notifications fontSize='large' color='secondary' />
            </IconButton>
          </div>
          <div className='ml-10'>
            <Avatar
              text='Prem kumar'
              onClick={(e) => setAnchorEl(e.currentTarget)}
            />
          </div>
        </div>
      </div>
      <CustomPopover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <div>
          <h4>Premkumar</h4>
          <h6>Admin</h6>
        </div>
        <h3>Logout</h3>
      </CustomPopover>
    </CustomAppBar>
  )
}

export default Header
