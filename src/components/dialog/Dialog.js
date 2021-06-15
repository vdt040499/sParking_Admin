import React, { useState } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

const Dialog = (props) => {
  const { title, children } = props
  const [visible, setVisible] = useState(true)

  return (
    <CModal
      show={visible}
      onClose={() => setVisible(!visible)}
      color="info"
    >
      <CModalHeader closeButton>
        <CModalTitle>{title}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {children}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(!visible)}>Cancel</CButton>
        <CButton color="info" onClick={() => setVisible(!visible)}>Do Something</CButton>{' '}
      </CModalFooter>
    </CModal>
  )
}

export default Dialog
