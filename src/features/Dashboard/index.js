import React, { lazy, useEffect, useState } from 'react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import socket from '../../socketIo.js'
import MainChartExample from '../../components/charts/MainChartExample'

import { setUserList } from '../../store/reducers/userSlice'
import { setCurTickets, setLastDateArr, setLastTicketArr, setSpace } from '../../store/reducers/ticketSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import EditSystem from './EditSystem/index.js'
import EditSystemForm from './EditSystem/EditSystemForm.js'

const WidgetsDropdown = lazy(() => import('../../components/widgets/WidgetsDropdown'))

const Dashboard = () => {
  const dispatch = useDispatch()

  const auth = useSelector(state => state.auth)
  const userList = useSelector(state => state.user.userList)
  const curTickets = useSelector(state => state.ticket.curTickets)
  const lastDateArr = useSelector(state => state.ticket.lastDateArr)
  const lastTicketArr = useSelector(state => state.ticket.lastTicketArr)
  const space = useSelector(state => state.ticket.space)

  const updateList = (users, curTickets, updatedSpace) => {
    dispatch(setUserList(users))
    dispatch(setCurTickets(curTickets))
    dispatch(setSpace(updatedSpace))
  }

  useEffect(() => {
    socket.emit("initial", (users, curTickets, dateArr, lastTicketArr, space) => {
      dispatch(setUserList(users))
      dispatch(setCurTickets(curTickets))
      dispatch(setLastDateArr(dateArr))
      dispatch(setLastTicketArr(lastTicketArr))
      dispatch(setSpace(space))
    })
    socket.on("changeList", updateList)

    // return () => {
    //   socket.disconnect()
    //   socket.off()
    // }
  }, [])

  return (
    <>
      <WidgetsDropdown curTickets={curTickets} space={space} lastTicketArr={lastTicketArr}/>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">Traffic</h4>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
            </CCol>
          </CRow>
          <MainChartExample space={space} lastDateArr={lastDateArr} lastTicketArr={lastTicketArr} style={{height: '300px', marginTop: '40px'}}/>
        </CCardBody>
      </CCard>

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Ticket Tracker
            </CCardHeader>
            <CCardBody>
              <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th>License Number</th>
                    <th>Card ID</th>
                    <th>User</th>
                    <th className="text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    userList.map((user, index) => (
                      <tr key={index} >
                        <td>
                          <strong>{user.plate}</strong>
                        </td>
                        <td>
                          <strong>{user.ID}</strong>
                        </td>
                        <td>
                          <div className="text-info"><strong>{user.username}</strong></div>
                          <div className="small text-muted">
                            <span>{user.position}</span> | Registered: Jan 1, 2015
                          </div>
                        </td>
                        <td className="text-center">
                          {!user.parkingStatus && <CIcon height={25} name="cil-x-circle" className="text-danger"/>}
                          {user.parkingStatus && <CIcon height={25} name="cil-check-circle" className="text-success"/>}

                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <EditSystem />
      {!auth.authen && <Redirect from="/" to="/login" />}
    </>
  )
}

export default Dashboard
