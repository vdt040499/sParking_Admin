import React from 'react'
import { CChart, CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import { CCol, CRow } from '@coreui/react'

const brandSuccess = getStyle('success') || '#4dbd74'
const brandInfo = getStyle('info') || '#20a8d8'
const brandDanger = getStyle('danger') || '#f86c6b'
const brandWarning = getStyle('warning')


const MainChartExample = (attributes) => {
  const { lastDateArr, lastTicketArr } = attributes

  const random = (min, max)=>{
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const ticketToMoney = (ticketArr) => {
    return ticketArr.map(ticket => ticket * 5000)
  }

  const defaultDatasetsForLine = (()=>{
    let elements = 7
    const data1 = lastTicketArr
    const data2 = ticketToMoney(lastTicketArr)
    const data3 = []
    for (let i = 0; i <= elements; i++) {
      // data1.push(random(50, 200))
      // data2.push(random(80, 100))
      data3.push(65)
    }
    return [
      {
        label: 'My First dataset',
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        data: data1
      },
      // {
      //   label: 'My Second dataset',
      //   backgroundColor: 'transparent',
      //   borderColor: brandSuccess,
      //   pointHoverBackgroundColor: brandSuccess,
      //   borderWidth: 2,
      //   data: data2
      // },
      // {
      //   label: 'My Third dataset',
      //   backgroundColor: 'transparent',
      //   borderColor: brandDanger,
      //   pointHoverBackgroundColor: brandDanger,
      //   borderWidth: 1,
      //   borderDash: [8, 5],
      //   data: data3
      // }
    ]
  })()

  const defaultOptionsForLine = (()=>{
    return {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              drawOnChartArea: false
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(20 / 5),
              max: 20
            },
            gridLines: {
              display: true
            }
          }]
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3
          }
        }
      }
    }
  )()

  const defaultDatasetsForBar = (() => {
    const data2 = ticketToMoney(lastTicketArr)

    return [
        {
          label: 'Revenue',
          backgroundColor: 'rgb(249,178,60,0.6)',
          borderColor: 'rgb(249,178,60)',
          pointBackgroundColor: 'rgb(249,178,60)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(249,178,60)',
          tooltipLabelColor: 'rgb(249,178,60)',
          data: data2
        }
      ]
  })()

  const defaultOptionsForBar = (() => {
    return {
      aspectRatio: 2,
        tooltips: {
        enabled: true
      }
    }
  })()

  const defaultDatasetsForPie = (() => {
    const data3 = [150, 350]

    return [
        {
          label: 'Revenue',
          backgroundColor: ['rgb(220,69,61)', 'rgb(79,165,71)'],
          borderColor: '#fff',
          data: data3
        }
      ]
  })()

  const defaultOptionsForPie = (() => {
    return {
      aspectRatio: 2,
        tooltips: {
        enabled: true
      }
    }
  })()

  // render
  return (
    <>
    <CRow>
      <CCol md="7">
      <CChartLine
      {...attributes}
      datasets={defaultDatasetsForLine}
      options={defaultOptionsForLine}
      labels={lastDateArr}
    />
      </CCol>
      <CCol md="5" className="d-none d-md-block">
      <CChart
        type="bar"
        datasets={defaultDatasetsForBar}
        options={defaultOptionsForBar}
        labels={lastDateArr}
      />
      <CChart
        type="pie"
        datasets={defaultDatasetsForPie}
        options={defaultOptionsForPie}
        labels={['Parked Slots', 'Available']}
      />
      </CCol>
    </CRow>
      </>
  )
}


export default MainChartExample
