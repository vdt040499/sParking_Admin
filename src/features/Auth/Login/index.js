import React, { useEffect } from 'react'
import { unwrapResult } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { login } from 'src/store/reducers/authSlice'
import LoginForm from './LoginForm'
import { Redirect } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const authRight = useSelector(state => state.auth.authen)

  useEffect(() => {
    if (authRight) {
      console.log(authRight)
    }
  }, [authRight])

  const handleLoginSubmit = async (values) => {
    try {
      console.log('Form submit: ', values)
      const action = login(values)
      const actionResult = await dispatch(action)
      const user = unwrapResult(actionResult)
      localStorage.setItem('user', JSON.stringify(user))
    } catch (error) {
        console.log('Error: ', error)
    }
  }

  return (
    <>
    <LoginForm onSubmit={handleLoginSubmit}/>
    {authRight && <Redirect from="/" to="/dashboard" />}
    </>
  )
}

export default Login
