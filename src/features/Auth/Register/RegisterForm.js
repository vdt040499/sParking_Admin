import React from 'react'
import { useForm } from 'react-hook-form'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import TextField from 'src/components/form-control/TextField'
import PasswordField from 'src/components/form-control/PasswordField'

const RegisterForm = (props) => {
  const registerForm = useForm({defaultValues: {
    username: '',
    email: '',
    password: '',
    retypePassword: ''
  }})

  const handleRegisterForm = (values) => {
    if (props.onSubmit) {
      props.onSubmit(values)
    }
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <TextField name='username' placeholder='Username' form={registerForm}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <TextField name='email' placeholder='Email' form={registerForm}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <PasswordField name='password' placeholder='Password' form={registerForm}/>
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <PasswordField name='retypePassword' placeholder='Retype Password' form={registerForm}/>
                  </CInputGroup>
                  <CButton color="success" block onClick={registerForm.handleSubmit(handleRegisterForm)}>Create Account</CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default RegisterForm
