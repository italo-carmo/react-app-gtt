import React from 'react'
const Main = React.lazy(() => import('./views/main/Main'))
const Graficos = React.lazy(() => import('./views/graficos/index'))
const PauDeSebo = React.lazy(() => import('./views/grafico-pau-de-sebo/index'))
const Logout = React.lazy(() => import('./views/logout'))


// Notifications


const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/main', name: 'Main', element: Main },
  { path: '/logout', name: 'Main', element: Logout },
  { path: '/grafico-esforco', name: 'Graficos', element: Graficos },
  { path: '/pau-de-sebo', name: 'Graficos', element: PauDeSebo },

]

export default routes
