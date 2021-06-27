import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../../assets/images/mainlogo.png'
import { useForm } from 'react-hook-form'

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCardTitle,
  CCol,
  CContainer,
  CForm,
  CHeaderBrand,
  CImg,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import TextField from 'src/components/form-control/TextField'
import PasswordField from 'src/components/form-control/PasswordField'

const LoginForm = (props) => {
  const userForm = useForm({ defaultValues: { email: '', password: '' }})

  const handleLoginSubmit = (values) => {
    if (props.onSubmit) {
      props.onSubmit(values)
    }
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <form onSubmit={userForm.handleSubmit(handleLoginSubmit)}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <TextField name='email' placeholder='Email' form={userForm}/>
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <PasswordField name='password' placeholder='Password' form={userForm}/>
                      </CInputGroup>
                      <CRow>
                        <CCol xs="6">
                          <CButton type="submit" color="primary" className="px-4" onClick={userForm.handleSubmit(handleLoginSubmit)}>Login</CButton>
                        </CCol>
                        {/* <CCol xs="6" className="text-right">
                          <CButton color="link" className="px-0">Forgot password?</CButton>
                        </CCol> */}
                      </CRow>
                    </form>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className=" d-flex justify-content-center align-items-center text-center">
                  <div className="c-avatar">
                    <CImg
                      src={Logo}
                      alt="admin@bootstrapmaster.com"
                    />
                  </div>
                  <div style="width: 100px">
                      <CCardTitle className="logoTitle">sParking</CCardTitle>
                      <div>The right choice for you</div>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default LoginForm
