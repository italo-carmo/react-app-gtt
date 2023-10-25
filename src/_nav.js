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
        component: CNavGroup,
        name: 'Escala',
        to: '',
        items: [
          {
            component: CNavGroup,
            name: 'Quadrinhos',
            to: '',
            items: [
              {
                class: 'nav-link nav-group-toggle submenu', // Adicione a classe CSS para ajustar o recuo
                component: CNavItem,
                name: 'Para Lançar',
                to: '/lancar-quadrinhos',
              },
              {
                class: 'nav-link nav-group-toggle submenu', // Adicione a classe CSS para ajustar o recuo
                component: CNavItem,
                name: 'Lista',
                to: '/lista-quadrinhos',
              },
            ]
          },
        ],
        root: true // Define o nível raiz para Escala
      },
      {
        component: CNavGroup,
        name: 'Estatística',
        to: '',
        items: [
          {
            component: CNavItem,
            name: 'Etapas',
            to: '/etapas',
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
                to: '/pau-de-sebo',
              }
            ]
          },
        ]
      },
    ],
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
