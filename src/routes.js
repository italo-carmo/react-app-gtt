import React from 'react'
import AlterarOperacionalidades from './views/alterar-operacionalidades/Main'
import EsforcosAereos from './views/esforcos-aereos/Main'
import Etapas from './views/etapas/Main'
import Ferias from './views/ferias/Main'
import LancarQuadrinhos from './views/lancar-quadrinhos-missoes/Main'
import ListaQuadrinhos from './views/lista-quadrinhos/Main'
import LancarManobras from './views/manobras/Main'
import LancarMissoesExterior from './views/missoes-exterior/Main'
import ListaPauDeSebo from './views/pau-de-sebo/Main'
import RevisarOms from './views/revisar_oms/Main'
import Passaportes from './views/passaportes/Main'
const Main = React.lazy(() => import('./views/main/Main'))
const Graficos = React.lazy(() => import('./views/graficos/index'))
const PauDeSebo = React.lazy(() => import('./views/grafico-pau-de-sebo/index'))
const Abastecimento = React.lazy(() => import('./views/abastecimento/index'))
const Logout = React.lazy(() => import('./views/logout'))
const TurmasDeChegada = React.lazy(() => import('./views/turmas-de-chegada/Main'))
const Cois = React.lazy(() => import('./views/cois/Main'))
const Planejamento = React.lazy(() => import('./views/planejamento/Main'))
const EstatisticaCargaPax = React.lazy(() => import('./views/estatistica_carga_pax/Main'))
const Exercicios = React.lazy(() => import('./views/timeline-exercicios/Main'))


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
  { path: '/abastecimento', name: 'Abastecimento', element: Abastecimento },
  { path: '/grafico-pau-de-sebo', name: 'Graficos', element: PauDeSebo },
  { path: '/pau-de-sebo', name: 'Pau de Sebo', element: ListaPauDeSebo },
  { path: '/lancar-quadrinhos', name: 'Lançar Quadrinhos', element: LancarQuadrinhos },
  { path: '/lista-quadrinhos', name: 'Lista Quadrinhos', element: ListaQuadrinhos },
  { path: '/manobras', name: 'Manobras', element: LancarManobras },
  { path: '/missoes-exterior', name: 'Missões Exterior', element: LancarMissoesExterior },
  { path: '/turmas-de-chegada', name: 'Turmas de Chegada', element: TurmasDeChegada },
  { path: '/alterar-operacionalidades', name: 'Alterar Operacionalidades', element: AlterarOperacionalidades },
  { path: '/cois', name: 'Conselhos de Instrução', element:  Cois},
  { path: '/esforcos-aereos', name: 'Esforços Aéreos', element:  EsforcosAereos},
  { path: '/planejamento', name: 'Planejamento', element:  Planejamento},
  { path: '/estatistica-carga-pax', name: 'Estatística de Carga e PAX', element:  EstatisticaCargaPax},
  { path: '/exercicios', name: 'Exercícios', element:  Exercicios},
  { path: '/passaportes', name: 'Passaportes', element:  Passaportes},
]

export default routes
