import CIcon from '@coreui/icons-react'
import { CButton, CCol, CForm, CInputGroup, CInputGroupPrepend, CInputGroupText, CRow } from '@coreui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import Dialog from 'src/components/dialog/Dialog'
import TextField from 'src/components/form-control/TextField'

const EditSystemForm = () => {
  const systemForm = useForm({ defaultValues: {
    email: '',
    password: ''
  }})

  return (
    <Dialog title='Edit System'>
      <CForm>
        <form>
          <CInputGroup className="mb-3">
            <CInputGroupPrepend>
              <CInputGroupText>
                <CIcon name="cil-user" />
              </CInputGroupText>
            </CInputGroupPrepend>
            <TextField name='email' placeholder='Email' form={systemForm}/>
          </CInputGroup>
          <CInputGroup className="mb-4">
            <CInputGroupPrepend>
              <CInputGroupText>
                <CIcon name="cil-lock-locked" />
              </CInputGroupText>
            </CInputGroupPrepend>
            <TextField name='password' placeholder='Password' form={systemForm}/>
          </CInputGroup>
        </form>
      </CForm>
    </Dialog>
  )
}

export default EditSystemForm
