import React, { useState } from 'react'
import { AppBar, IconButton } from '@mui/material'
import { styled } from '@mui/system'
import { DarkMode, LightMode, Notifications } from '@mui/icons-material'
import Avatar from '../Avatar'
import CustomPopover from '../PopOver'
import { CustomAppBar } from '../StyledComponents'
import { useDispatch, useSelector } from 'react-redux'
import { changeTheme } from '@/store/slice/global'
import { useLogoutMutation } from '@/store/apis/authApis'

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.global.mode)
  const admin = useSelector((state) => state.auth.admin)

  const [logout, result] = useLogoutMutation()

  return (
    <CustomAppBar>
      <div className='flex justify-between align-center p-10'>
        <div className='flex align-center'>
          <img
            src='https://res.cloudinary.com/dhnbwvk2m/image/upload/w_300/q_auto/f_auto/v1679995623/ingredient/d0q0dest9vnxacyi2n8b.png'
            alt='react_logo'
            width='80'
            height='80'
          />
          <h3 className='ml-5 textSecondary'>Yaazh Admin</h3>
        </div>
        <div className='flex align-center'>
          <div>
            <IconButton onClick={() => dispatch(changeTheme(theme === 'light' ? 'dark' : 'light'))}>
              {theme === 'light' ? <DarkMode color='secondary' /> : <LightMode color='primary' />}
            </IconButton>
          </div>
          <div className='ml-10'>
            <IconButton>
              <Notifications color='secondary' />
            </IconButton>
          </div>
          <div className='ml-10'>
            <Avatar text={`${admin?.first_name}`} onClick={(e) => setAnchorEl(e.currentTarget)} />
          </div>
        </div>
      </div>
      <CustomPopover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
        <div>
          <h4>{admin?.first_name}</h4>
        </div>
        <h3 className='pointer' onClick={() => logout()}>
          Logout
        </h3>
      </CustomPopover>
    </CustomAppBar>
  )
}

export default React.memo(Header)
