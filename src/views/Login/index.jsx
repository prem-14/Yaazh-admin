import React, { useState, useEffect } from 'react'
import { SITE_NAME } from '@/utils/UI'
import inputData from '../../components/inputs'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import './login.css'
import { Button, Typography } from '@mui/material'
import { useLoginMutation } from '@/store/apis/authApis'
import { setAdmin } from '@/store/slice/auth'
import { useDispatch, useSelector } from 'react-redux'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [login, results] = useLoginMutation()
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const { admin, accessToken } = useSelector((state) => state.auth)

  const from = location.state?.from || '/products'

  const formikInitialValues = {
    email: import.meta.env.VITE_EMAIL,
    password: import.meta.env.VITE_PASSWORD,
  }

  const validationArray = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required!'),
    password: Yup.string().min(8, 'Minimum 8 characters').required('Required!'),
  })

  const formik = useFormik({
    initialValues: formikInitialValues,
    validationSchema: validationArray,
    onSubmit: (values) => {
      login(values)
    },
  })

  const loginForm = [
    {
      label: 'Email address',
      name: 'email',
      type: 'text',
      placeholder: 'Enter your email address',
      class: 'col-12',
      autoFocus: true,
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      placeholder: 'Enter your password',
      class: 'col-12',
    },
  ]

  useEffect(() => {
    if (results.isLoading) {
      setError('')
    } else if (results.isError) {
      setError(results?.error?.data?.data?.message)
    }
  }, [results])

  useEffect(() => {
    if (accessToken && admin?.id) {
      navigate(from, { replace: true })
    }
  }, [admin, accessToken])

  return (
    <div className='login'>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className='loginCnt'>
            <div className='loginLogo'>
              <img
                className='cmpnyLogo'
                src='https://res.cloudinary.com/dhnbwvk2m/image/upload/w_300/q_auto/f_auto/v1679995623/ingredient/d0q0dest9vnxacyi2n8b.png'
                height={100}
              />
            </div>
            <div className='col-12 mb-10'>
              <h2>Welcome to {SITE_NAME}</h2>
            </div>
            <div className='loginError'>{error}</div>

            <div className='row mt-20'>{inputData(formik, loginForm)}</div>

            <div className='col-12 mt-20'>
              <Button type='submit' variant='contained'>
                Login
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
