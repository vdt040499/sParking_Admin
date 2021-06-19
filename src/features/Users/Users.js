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


  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            Users
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={userList}
            fields={[
              { key: 'username', _classes: 'font-weight-bold' },
              'plate', 'position', 'createdAt', 'bank', 'balance'
            ]}
            hover
            striped
            loading={loading}
            // itemsPerPage={10}
            // activePage={page}
            // clickableRows
            // onRowClick={(item) => history.push(`/users/${item.id}`)}
            scopedSlots = {{
              'plate':
                (item)=>(
                  <td>
                    <CBadge color={getBadge(item.plate)}>
                      {item.plate}
                    </CBadge>
                  </td>
                ),
              'position':
                (item)=>(
                  <td>
                    <CBadge color={getBadge(item.position)}>
                      {item.position}
                    </CBadge>
                  </td>
                ),
              'bank':
                (item)=>(
                  <td>
                    <CBadge color={getBadge(item?.moneySource?.bank)}>
                      {item?.moneySource?.bank}
                    </CBadge>
                  </td>
                )
            }}
          />
          {/* <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={Math.ceil(userList.length/10)}
            doubleArrows={false}
            align="center"
          /> */}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Users
