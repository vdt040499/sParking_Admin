import { unwrapResult } from '@reduxjs/toolkit'
import React from 'react'
import { useDispatch } from 'react-redux'
import { register } from 'src/store/reducers/authSlice'
import RegisterForm from './RegisterForm'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router-dom'

const Register = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {enqueueSnackbar} = useSnackbar()

  const handelRegisterForm = async (values) => {
    try {
      const action = register(values)
      const actionResult = await dispatch(action)
      const message = unwrapResult(actionResult)
      enqueueSnackbar(message, { variant: 'success' })
      if (message) {
        history.push('/login')
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  }

  return (
    <RegisterForm onSubmit={handelRegisterForm}/>
  )
}

export default Register
