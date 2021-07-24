import React, { useEffect, useState } from 'react'
import Logo from '../assets/images/mainlogo.png'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CImg,
  CCardTitle,
  CForm,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CCol,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter
} from '@coreui/react'

import { set } from '../store/reducers/styleSlice'

// routes config
import routes from '../routes'
import { useForm } from 'react-hook-form'

import {
  TheHeaderDropdown
}  from './index'
import TextField from './form-control/TextField'
import { setSpace, update } from 'src/store/reducers/systemSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { useSnackbar } from 'notistack'

const TheHeader = () => {
  const dispatch = useDispatch()
  const {enqueueSnackbar} = useSnackbar()

  const [dialog, setDialog] = useState(false)
  const space = useSelector(state => state.system.space)
  const systemForm = useForm({ defaultValues: { totalSlots: space.totalSlots, ticketPrice: space.ticketPrice }})

  const sidebarShow = useSelector(state => state.style.sidebarShow)

  useEffect(() => {
    systemForm.setValue('totalSlots', space.totalSlots)
    systemForm.setValue('ticketPrice', space.ticketPrice)
  }, [space])

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch(set(val))
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch(set(val))
  }

  const handleUpdateSystem = async (data) => {
    setDialog(!dialog)
    try {
      const spaceId = space._id
      data = {
        totalSlots: parseInt(data.totalSlots),
        ticketPrice: parseInt(data.ticketPrice),
        avai: parseInt(data.totalSlots) - parseInt(space.parked)
      }
      const action = update({ spaceId, data })
      const actionResult = await dispatch(action)
      const updatedSpace = unwrapResult(actionResult)
      dispatch(setSpace(updatedSpace))
      enqueueSnackbar('Updated successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Updated failed', { variant: 'error' })
    }
  }

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <div className="c-avatar">
          <CImg
            src={Logo}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
          <CCardTitle className="logoTitle">sParking</CCardTitle>
        </div>
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3" >
          <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem  className="px-3">
          <CHeaderNavLink to="/users">Users</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem  className="px-3">
          <CHeaderNavLink to="/tickets">Tickets</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <TheHeaderDropdown/>
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
        <CForm>
          <form>
            <CRow className="justify-content-end mt-2">
              <CCol md="3">
                <CInputGroup>
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      Total Slots
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <TextField name='totalSlots' form={systemForm}/>
                </CInputGroup>
              </CCol>
              <CCol md="3">
                <CInputGroup>
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      Ticket Price
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <TextField name='ticketPrice' form={systemForm}/>
                </CInputGroup>
              </CCol>
              <CCol xs="2">
                <CButton color="primary" className="px-4" onClick={() => setDialog(true)}>Update</CButton>
              </CCol>
              {/* <CCol xs="6" className="text-right">
                <CButton color="link" className="px-0">Forgot password?</CButton>
              </CCol> */}
            </CRow>
          </form>
        </CForm>
      </CSubheader>
      <CModal
        show={dialog}
        onClose={() => setDialog(!dialog)}
        color="info"
      >
        <CModalHeader closeButton>
          <CModalTitle>Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to update the system ?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setDialog(!dialog)}>Cancel</CButton>
          <CButton color="info" onClick={systemForm.handleSubmit(handleUpdateSystem)}>Update</CButton>
        </CModalFooter>
      </CModal>
    </CHeader>
  )
}

export default TheHeader
