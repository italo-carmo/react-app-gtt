import React, {useEffect, useState} from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import useApi from '../../src/services/Api'
import { CBadge } from '@coreui/react'

export const AppSidebarNav = ({ items }) => {
  const location = useLocation()
  const [lancarQuadrinho, setLancarQuadrinho ] = useState(false)

  const Api = useApi()

 const getMissoesParaLancar = async () => {
  var res = await Api.getMissoesLancarQuadrinhos()

  if(res.data.length > 0) {
    setLancarQuadrinho(res.data.length)
  } else {
    setLancarQuadrinho(false)
  }
 }

 useEffect(()=>{
  getMissoesParaLancar()
 },[])

  const navLink = (name, icon, badge) => {
    if(badge) {
      var text = badge.text
    } else {
      var text = ''
    }

    if(name == 'Escala') {
      if(lancarQuadrinho) {
        var text = lancarQuadrinho
      }
    }
    return (
      <>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item, index) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
          })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge)}
      </Component>
    )
  }
  const navGroup = (item, index) => {
    const { component, name, icon, badge, to, ...rest } = item
    const Component = component
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon, badge)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index),
        )}
      </Component>
    )
  }

  return (
    <React.Fragment>
      {items &&
        items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </React.Fragment>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
