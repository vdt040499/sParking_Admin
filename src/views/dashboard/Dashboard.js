import React, { lazy } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import MainChartExample from '../charts/MainChartExample.js'

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
// const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const Dashboard = () => {
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
                  <tr>
                    <td>
                      <strong>63B4 12345</strong>
                    </td>
                    <td>
                      <div className="text-info"><strong>Yiorgos Avraamu</strong></div>
                      <div className="small text-muted">
                        <span>Student</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td>
                      <strong>17521022</strong>
                    </td>
                    <td>
                      <strong>BIDV</strong>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cil-x-circle" className="text-danger"/>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>63B4 12345</strong>
                    </td>
                    <td>
                      <div className="text-info"><strong>Avram Tarasios</strong></div>
                      <div className="small text-muted">

                        <span>Lecturer</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td>
                      <strong>17521022</strong>
                    </td>
                    <td>
                      <strong>TPBank</strong>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cil-check-circle" className="text-success"/>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>63B4 12345</strong>
                    </td>
                    <td>
                      <div className="text-info"><strong>Quintin Ed</strong></div>
                      <div className="small text-muted">
                        <span>Student</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td>
                      <strong>17521022</strong>
                    </td>
                    <td>
                      <strong>ACB</strong>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cil-x-circle" className="text-danger"/>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>63B4 12345</strong>
                    </td>
                    <td>
                      <div className="text-info"><strong>Enéas Kwadwo</strong></div>
                      <div className="small text-muted">
                        <span>Lecturer</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td>
                      <strong>17521022</strong>
                    </td>
                    <td>
                      <strong>Vietcombank</strong>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cil-check-circle" className="text-success"/>
                    </td>
                  </tr>
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
