import React, { lazy, useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import io from 'socket.io-client'
import MainChartExample from '../charts/MainChartExample.js'

let socket;

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
// const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const Dashboard = () => {
  const ENDPOINT = 'http://localhost:5000'
  var connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity",
    "timeout" : 10000,
    "transports" : ["websocket"]
  };

  const [users, setUsers] = useState([])

  const updateList = (users) => {
    setUsers(users)
    console.log('Users: ', users)
  }

  useEffect(() => {
    socket = io(ENDPOINT, connectionOptions)
    socket.emit("initial", (users) => {
      console.log(users)
      setUsers(users)
    })
    socket.on("changeList", updateList)

    return () => {
      socket.disconnect()
      socket.off()
    }
  }, [])

  return (
    <>
      <WidgetsDropdown />
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">Traffic</h4>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
            </CCol>
          </CRow>
          <MainChartExample style={{height: '300px', marginTop: '40px'}}/>
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
                    <th>User</th>
                    <th>Card ID</th>
                    <th>Payment Method</th>
                    <th className="text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    users.map((user) => (
                      <tr>
                        <td>
                          <strong>{user.plate}</strong>
                        </td>
                        <td>
                          <div className="text-info"><strong>{user.username}</strong></div>
                          <div className="small text-muted">
                            <span>{user.position}</span> | Registered: Jan 1, 2015
                          </div>
                        </td>
                        <td>
                          <strong>{user.ID}</strong>
                        </td>
                        <td>
                          <strong>BIDV</strong>
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
    </>
  )
}

export default Dashboard
