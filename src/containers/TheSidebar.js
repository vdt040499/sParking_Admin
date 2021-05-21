import React from 'react'
import Logo from '../assets/images/mainlogo.png'
import { useSelector, useDispatch } from 'react-redux'
import { set } from '../store/reducers/styleSlice'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CImg,
} from '@coreui/react'

// sidebar nav config
import navigation from './_nav'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.style.sidebarShow)
  console.log('hihi', show)

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => {
        dispatch(set(val))
      }}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <div className="c-avatar">
          <CImg
            src={Logo}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
