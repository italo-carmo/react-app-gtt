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
  },
  
  {
    component: CNavGroup,
    name: 'Usuário',
    to: '/base',
    icon: <img src="https://www.1gtt.com.br/app/user.png" style={{marginRight:20}} width="25px" height="25px"/>,
    items: [ {
      component: CNavItem,
      name: 'Turmas de Chegada',
      class: 'nav-link-submenu',
      to: '/turmas-de-chegada',
    },],
  },
  {
    component: CNavGroup,
    name: 'Escala',
    to: '/base',
    icon: <img src="https://www.1gtt.com.br/app/plane.png" style={{marginRight:20}} width="25px" height="25px"/>,
    badge: {
      color: 'info',
      text: '',
    },
    items: [
              {
                component: CNavItem,
                name: 'Lançar Quadrinhos',
                class: 'nav-link-submenu',
                to: '/lancar-quadrinhos',
              },
              {
                component: CNavItem,
                name: 'Lançar Manobras',
                class: 'nav-link-submenu',
                to: '/manobras',
              },
              {
                component: CNavItem,
                name: 'Missões no Exterior',
                class: 'nav-link-submenu',
                to: '/missoes-exterior',
              },

              {
                component: CNavItem,
                name: 'Ver Quadrinhos',
                to: '/lista-quadrinhos',
              },
    ],
  },
  {
    component: CNavGroup,
    name: 'Estatística',
    to: '/base',
    icon: <img src="https://www.1gtt.com.br/estatisticas.png" style={{marginRight:20}} width="25px" height="25px"/>,
    items: [
          {
            component: CNavItem,
            name: 'Etapas',
            to: '/etapas',
          },
          {
            component: CNavItem,
            name: 'Pau de Sebo',
            to: '/pau-de-sebo',
          },
          {
            component: CNavGroup,
            name: 'Gráficos',
            to: '',
            items: [
              {
                component: CNavItem,
                name: 'Esforço Aéreo',
                to: '/grafico-esforco',
              },
              {
                component: CNavItem,
                name: 'Pau de Sebo',
                to: '/grafico-pau-de-sebo',
              }
            ]
          },
        ]
  },
  {
    component: CNavGroup,
    name: 'Instrução',
    to: '/base',
    icon: <img src="https://www.1gtt.com.br/graduacao.png" style={{marginRight:20}} width="25px" height="25px"/>,
    items: [
          {
            component: CNavItem,
            name: 'Conselhos de Instrução',
            to: '/cois',
          },
        ]
  },
  {
    component: CNavGroup,
    name: 'Apoio',
    to: '/base',
    icon: <img src="https://www.1gtt.com.br/app/contract.png" style={{marginRight:20}} width="25px" height="25px"/>,
    items: [
      {
      component: CNavItem,
      name: 'Revisar OMS',
      to: '/revisar-oms',
    },
  ],
  },
]

export default _nav
