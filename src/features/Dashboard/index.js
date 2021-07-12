import React, { lazy, useEffect, useState } from 'react'

import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CPagination,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import socket from '../../socketIo.js'
import MainChartExample from '../../components/charts/MainChartExample'

import { setUserList } from '../../store/reducers/userSlice'
import { setTicketList, setLastDateArr, setLastTicketArr, setSpace, setAllTicketList } from '../../store/reducers/systemSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory, useLocation } from 'react-router'
import { convertToDate } from 'src/reusable/formatDateTime.js'

const WidgetsDropdown = lazy(() => import('../../components/widgets/WidgetsDropdown'))

const getBadge = status => {
  switch (status) {
    default: return 'primary'
  }
}

const Dashboard = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [page, setPage] = useState(currentPage)
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)

  const auth = useSelector(state => state.auth)
  const userList = useSelector(state => state.user.userList)
  const ticketList = useSelector(state => state.system.ticketList)
  const lastDateArr = useSelector(state => state.system.lastDateArr)
  const lastTicketArr = useSelector(state => state.system.lastTicketArr)
  const space = useSelector(state => state.system.space)

  const updateList = (users, ticketList, allTicketList, updatedSpace) => {
    dispatch(setUserList(users))
    dispatch(setTicketList(ticketList))
    dispatch(setAllTicketList(allTicketList))
    dispatch(setSpace(updatedSpace))
  }

  useEffect(() => {

    if(!auth.authen) {
      history.push("/")
    }

    socket.emit("initial", (users, ticketList, allTicketList, dateArr, lastTicketArr, space) => {
      dispatch(setUserList(users))
      dispatch(setTicketList(ticketList))
      dispatch(setAllTicketList(allTicketList))
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

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/dashboard?page=${newPage}`)
  }

  const  filterUserList = (userList) => {
    const filterdList = userList.filter(user => user.position !== 'Admin')
    return filterdList
  }

  return (
    <>
      <WidgetsDropdown ticketList={ticketList} space={space} lastTicketArr={lastTicketArr}/>
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
              <CDataTable
                items={filterUserList(userList)}
                fields={[
                  { key: 'plate', label: 'License Number', _classes: 'font-weight-bold text-center', sorter: false},
                  { key: 'ID', label: 'Card ID', _classes: 'font-weight-bold text-center' },
                  { key: 'user', sorter: false, filter: false },
                  { key: 'status', _classes: 'text-center', sorter: false, filter: false }
                ]}
                hover
                striped
                columnFilter
                sorter
                itemsPerPage={10}
                activePage={page}
                // clickableRows
                // onRowClick={(item) => history.push(`/users/${item.id}`)}
                scopedSlots = {{
                  'user':
                    (item)=>(
                      <td>
                        <div className="text-info"><strong>{item.username}</strong></div>
                          <div className="small text-muted">
                            <span>{item.position}</span> | Registered: {convertToDate(item.createdAt)}
                          </div>
                      </td>
                    ),
                  'plate':
                    (item)=>(
                      <td className="text-center">
                        <CBadge color={getBadge(item.plate)}>
                          {item.plate}
                        </CBadge>
                      </td>
                    ),
                  'ID':
                  (item)=>(
                    <td className="text-center">
                      <strong>{item.ID}</strong>
                    </td>
                  ),
                  'status':
                    (item)=>(
                      <td className="text-center">
                        {!item.parkingStatus && <CIcon height={25} name="cil-x-circle" className="text-danger"/>}
                        {item.parkingStatus && <CIcon height={25} name="cil-check-circle" className="text-success"/>}
                      </td>
                    )
                }}
              />
              <CPagination
                activePage={page}
                onActivePageChange={pageChange}
                pages={Math.ceil(userList.length/10)}
                doubleArrows={false}
                align="center"
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {!auth.authen && <Redirect from="/" to="/login" />}
    </>
  )
}

export default Dashboard
