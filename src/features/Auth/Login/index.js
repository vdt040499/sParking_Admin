import React, { useEffect } from 'react'
import { unwrapResult } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { login } from 'src/store/reducers/authSlice'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router-dom'

import LoginForm from './LoginForm'

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {enqueueSnackbar} = useSnackbar()
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (auth.authen) {
      history.push('/')
    }
  }, [auth.authen])

  const handleLoginSubmit = async (values) => {
    try {
      const action = login(values)
      const actionResult = await dispatch(action)
      const user = unwrapResult(actionResult)
      localStorage.setItem('user', JSON.stringify(user))
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  }

  return (
    <>
      <LoginForm onSubmit={handleLoginSubmit}/>
    </>
  )
}

export default Login
