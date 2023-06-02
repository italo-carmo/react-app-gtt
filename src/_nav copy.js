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
    to: '/home',
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
    icon: <img src="./user.png" style={{marginRight:20}} width="25px" height="25px"/>,
    items: [
      {
        component: CNavItem,
        name: 'Meus Dados',
        to: '/theme/colors',
        icon: <img src="./account.png" style={{marginRight:20}} width="25px" height="25px"/>,
      },
      {
        component: CNavItem,
        name: 'Cartões',
        to: '/theme/colors',
        icon: <img src="./data-de-validade.png" style={{marginRight:20}} width="25px" height="25px"/>,
      },
      {
        component: CNavItem,
        name: 'Cursos',
        to: '/theme/colors',
        icon: <img src="./graduated.png" style={{marginRight:20}} width="25px" height="25px"/>,
      },
      {
        component: CNavItem,
        name: 'Conselhos',
        to: '/theme/colors',
        icon: <img src="./round-table.png" style={{marginRight:20}} width="25px" height="25px"/>,
      },
      {
        component: CNavItem,
        name: 'Operacionalidades',
        to: '/theme/colors',
        icon: <img src="./foguete.png" style={{marginRight:20}} width="25px" height="25px"/>,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Operações',
    to: '/base',
    icon: <img src="./plane.png" style={{marginRight:20}} width="25px" height="25px"/>,
    items: [
      {
        component: CNavItem,
        name: 'Accordion',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Breadcrumb',
        to: '/base/breadcrumbs',
      },
      {
        component: CNavItem,
        name: 'Cards',
        to: '/base/cards',
      },
      {
        component: CNavItem,
        name: 'Carousel',
        to: '/base/carousels',
      },
      {
        component: CNavItem,
        name: 'Collapse',
        to: '/base/collapses',
      },
      {
        component: CNavItem,
        name: 'List group',
        to: '/base/list-groups',
      },
      {
        component: CNavItem,
        name: 'Navs & Tabs',
        to: '/base/navs',
      },
      {
        component: CNavItem,
        name: 'Pagination',
        to: '/base/paginations',
      },
      {
        component: CNavItem,
        name: 'Placeholders',
        to: '/base/placeholders',
      },
      {
        component: CNavItem,
        name: 'Popovers',
        to: '/base/popovers',
      },
      {
        component: CNavItem,
        name: 'Progress',
        to: '/base/progress',
      },
      {
        component: CNavItem,
        name: 'Spinners',
        to: '/base/spinners',
      },
      {
        component: CNavItem,
        name: 'Tables',
        to: '/base/tables',
      },
      {
        component: CNavItem,
        name: 'Tooltips',
        to: '/base/tooltips',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Apoio',
    to: '/base',
    icon: <img src="./contract.png" style={{marginRight:20}} width="25px" height="25px"/>,
    items: [
      {
        component: CNavItem,
        name: 'Meus Dados',
        to: '/theme/colors',
        icon: <img src="./account.png" style={{marginRight:20}} width="25px" height="25px"/>,
      },
      {
        component: CNavItem,
        name: 'Cartões',
        to: '/theme/colors',
        icon: <img src="./data-de-validade.png" style={{marginRight:20}} width="25px" height="25px"/>,
      },
      {
        component: CNavItem,
        name: 'Cursos',
        to: '/theme/colors',
        icon: <img src="./graduated.png" style={{marginRight:20}} width="25px" height="25px"/>,
      },
      {
        component: CNavItem,
        name: 'Conselhos',
        to: '/theme/colors',
        icon: <img src="./round-table.png" style={{marginRight:20}} width="25px" height="25px"/>,
      },
      {
        component: CNavItem,
        name: 'Operacionalidades',
        to: '/theme/colors',
        icon: <img src="./foguete.png" style={{marginRight:20}} width="25px" height="25px"/>,
      },
    ],
  },
]

export default _nav
