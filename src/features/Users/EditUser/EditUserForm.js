import CIcon from '@coreui/icons-react'
import { CForm, CInputGroup, CInputGroupPrepend, CInputGroupText } from '@coreui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import Dialog from 'src/components/dialog/Dialog'
import TextField from 'src/components/form-control/TextField'

const EditUserForm = () => {
  const parkedSlots = useSelector(state => state.system.space.parked)
  const avaiSlots = useSelector(state => state.system.space.avai)

  const userForm = useForm({ defaultValues: {
    parked: parkedSlots,
    avai: avaiSlots
  }})

  return (
    <Dialog title='Edit System'>
      <CForm>
        <form>
          <CInputGroup className="mb-3">
            <CInputGroupPrepend>
              <CInputGroupText>
                <CIcon name="cil-user" className="text-danger"/>
              </CInputGroupText>
            </CInputGroupPrepend>
            <TextField name='parked' placeholder='Parked slots' form={userForm}/>
          </CInputGroup>
          <CInputGroup className="mb-4">
            <CInputGroupPrepend>
              <CInputGroupText>
                <CIcon name="cil-user" className="text-success"/>
              </CInputGroupText>
            </CInputGroupPrepend>
            <TextField name='avai' placeholder='Available slots' form={userForm}/>
          </CInputGroup>
        </form>
      </CForm>
    </Dialog>
  )
}

export default EditUserForm
