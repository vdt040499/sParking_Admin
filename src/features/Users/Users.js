import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination
} from '@coreui/react'

import { useDispatch, useSelector } from 'react-redux'
import { setUserList } from 'src/store/reducers/userSlice'
import socket from 'src/socketIo'
import { setLoading } from 'src/store/reducers/systemSlice'
import { convertToDateTime } from 'src/reusable/formatDateTime'

const getBadge = status => {
  switch (status) {
    // Bank
    case 'VCB': return 'success'
    case 'BIDV': return 'secondary'

    // Position
    case 'Admin': return 'danger'
    case 'Student': return 'info'
    default: return 'primary'
  }
}

const Users = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const userList = useSelector(state => state.user.userList)
  const loading = useSelector(state => state.system.loading)
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)

  const updateList = (users, ticketList, updatedSpace) => {
    dispatch(setUserList(users))
  }

  useEffect(() => {
    socket.emit("initial", (users, ticketList, dateArr, lastTicketArr, space) => {
      dispatch(setLoading(true))
      dispatch(setUserList(users))
      dispatch(setLoading(false))
    })
    socket.on("changeList", updateList)

    // return () => {
    //   socket.disconnect()
    //   socket.off()
    // }
  }, [])

  useEffect(() => {
    console.log(loading)
  }, [loading])

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }

  const  filterUserList = (userList) => {
    const filterdList = userList.filter(user => user.position !== 'Admin')
    return filterdList
  }

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            Users
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={filterUserList(userList)}
            fields={[
              { key: 'username', _classes: 'font-weight-bold', _style: { width: '15%'}, sorter: false},
              { key: 'plate', _classes: 'text-center', _style: { width: '15%'}, sorter: false},
              { key: 'ID', label: 'Card ID', _classes: 'text-center'},
              { key: 'position', _classes: 'text-center', sorter: false },
              { key: 'createdAt', _classes: 'text-center'},
              { key: 'bank', _classes: 'text-center', sorter: false }
            ]}
            hover
            striped
            columnFilter
            sorter
            loading={loading}
            itemsPerPage={10}
            activePage={page}
            // clickableRows
            // onRowClick={(item) => history.push(`/users/${item.id}`)}
            scopedSlots = {{
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
              'position':
                (item)=>(
                  <td className="text-center">
                    <CBadge color={getBadge(item.position)}>
                      {item.position}
                    </CBadge>
                  </td>
                ),
              'bank':
                (item)=>(
                  <td className="text-center">
                    <CBadge color={getBadge(item?.moneySource?.bank)}>
                      {item?.moneySource?.bank}
                    </CBadge>
                  </td>
                ),
              'createdAt':
                (item)=>(
                  <td className="text-center">
                    {convertToDateTime(item.createdAt)}
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
  )
}

export default Users
