import React from 'react'
import {
  CWidgetDropdown,
  CRow,
  CCol
} from '@coreui/react'
import ChartLineSimple from '../charts/ChartLineSimple'
import ChartBarSimple from '../charts/ChartBarSimple'

const WidgetsDropdown = (props) => {
  const { curTickets } = props

  return (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-primary"
          header={curTickets.length.toString()}
          text="Total Entries"
          footerSlot={
            <ChartLineSimple
              pointed
              className="c-chart-wrapper mt-3 mx-3"
              style={{height: '70px'}}
              dataPoints={[65, 59, 84, 84, 51, 55, 40]}
              pointHoverBackgroundColor="primary"
              label="Members"
              labels="months"
            />
          }
        />
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-danger"
          header="404"
          text="Parked Slots"
          footerSlot={
            <ChartLineSimple
              pointed
              className="mt-3 mx-3"
              style={{height: '70px'}}
              dataPoints={[1, 18, 9, 17, 34, 22, 11]}
              pointHoverBackgroundColor="rgb(250, 152, 152)"
              options={{ elements: { line: { tension: 0.00001 }}}}
              label="Members"
              labels="months"
            />
          }
        />
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-success"
          header="1.411"
          text="Available"
          footerSlot={
            <ChartLineSimple
              className="mt-3"
              style={{height: '70px'}}
              backgroundColor="rgba(255,255,255,.2)"
              dataPoints={[78, 81, 80, 45, 34, 12, 40]}
              options={{ elements: { line: { borderWidth: 2.5 }}}}
              pointHoverBackgroundColor="warning"
              label="Members"
              labels="months"
            />
          }
        />
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-warning"
          header="4.499.000"
          text="Revenue"
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{height: '70px'}}
              backgroundColor="warning"
              label="Members"
              labels="months"
            />
          }
        />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
