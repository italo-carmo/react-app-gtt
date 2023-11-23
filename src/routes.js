import React from 'react'
import Etapas from './views/etapas/Main'
import Ferias from './views/ferias/Main'
import LancarQuadrinhos from './views/lancar-quadrinhos-missoes/Main'
import ListaQuadrinhos from './views/lista-quadrinhos/Main'
import LancarManobras from './views/manobras/Main'
import ListaPauDeSebo from './views/pau-de-sebo/Main'
import RevisarOms from './views/revisar_oms/Main'
const Main = React.lazy(() => import('./views/main/Main'))
const Graficos = React.lazy(() => import('./views/graficos/index'))
const PauDeSebo = React.lazy(() => import('./views/grafico-pau-de-sebo/index'))
const Abastecimento = React.lazy(() => import('./views/abastecimento/index'))
const Logout = React.lazy(() => import('./views/logout'))


// Notifications


const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/main', name: 'Main', element: Main },
  { path: '/etapas', name: 'Etapas', element: Etapas },
  { path: '/revisar-oms', name: 'RevisarOms', element: RevisarOms },
  { path: '/ferias', name: 'Ferias', element: Ferias },
  { path: '/logout', name: 'Main', element: Logout },
  { path: '/grafico-esforco', name: 'Graficos', element: Graficos },
  { path: '/pau-de-sebo', name: 'Graficos', element: PauDeSebo },
  { path: '/abastecimento', name: 'Abastecimento', element: Abastecimento },
  { path: '/lista-pau-de-sebo', name: 'Pau de Sebo', element: ListaPauDeSebo },
  { path: '/lancar-quadrinhos', name: 'Lançar Quadrinhos', element: LancarQuadrinhos },
  { path: '/lista-quadrinhos', name: 'Lista Quadrinhos', element: ListaQuadrinhos },
  { path: '/manobras', name: 'Manobras', element: LancarManobras },
]

export default routes
