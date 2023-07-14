import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Home',
    to: '/main',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NOVO',
    },
  },
  
  {
    component: CNavGroup,
    name: 'Usuário',
    to: '/base',
    icon: <img src="https://www.1gtt.com.br/app/user.png" style={{marginRight:20}} width="25px" height="25px"/>,
    items: [],
  },
  {
    component: CNavGroup,
    name: 'Operações',
    to: '/base',
    icon: <img src="https://www.1gtt.com.br/app/plane.png" style={{marginRight:20}} width="25px" height="25px"/>,
    items: [
      {
        component: CNavItem,
        name: 'Esforço Aéreo',
        to: '/grafico-esforco',
      },
      {
        component: CNavItem,
        name: 'Pau de Sebo',
        to: '/pau-de-sebo',
      },
      {
        component: CNavItem,
        name: 'Abastecimento',
        to: '/abastecimento',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Apoio',
    to: '/base',
    icon: <img src="https://www.1gtt.com.br/app/contract.png" style={{marginRight:20}} width="25px" height="25px"/>,
    items: [],
  },
]

export default _nav
