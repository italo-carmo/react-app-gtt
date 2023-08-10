import React, { useEffect, useState, useRef } from 'react'
import styles from './styles.css'
import {
  CButton,
  CCard,

} from '@coreui/react'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import useApi from 'src/services/Api'
import LoadingSpinner from 'src/components/Loading'
import { useLocation } from 'react-router-dom';

const Omis = ({match}) => {

  const Api = useApi()
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  // Extrair os parâmetros da query string e convertê-los de volta em arrays
  const dados_params = params.get('dados');

  const dados = JSON.parse(decodeURIComponent(dados_params));

  console.log(dados)


  if(dados) {
    var aviao = dados.aviao
    var data = dados.data
    var hora = dados.hora
    var origem = dados.etapas[0].dep
    var destino = dados.etapas[0].pouso
    var dataHora = new Date(dados.etapas[0].depIso);
    //dataHora.setHours(dataHora.getHours() - 3);

    const formato = new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
  });
    var horas = formato.format(dataHora)

    var omis = dados.omis
    var tripulacao = dados.tripulacao
  } else {
    var aviao = ''
    var data = ''
    var hora = ''
    var origem = ''
    var destino = ''
    var horas = ''
    var omis = ''
    var tripulacao = []
  }


  return (
    <div className='container'>
    
      <div className='topo'>

        <div className='topo-left'>
            <span className='solicitante'>Solicitante/Comandante da Aeronave.</span>
        </div>

        <div className='topo-center'>
        <span className='titulo'>COMANDO DA AERONÁUTICA</span>
        <span className='titulo'>GRUPAMENTO DE APOIO DE ANÁPOLIS</span>
        <span className='titulo'>SEÇÃO DE SUBSISTÊNCIA</span>
        
        </div>

        <div className='topo-right'>
        <span className='solicitante'>Chefe da SUB</span>
        </div>
      </div>

      <div className='center'>

        <div className='topo-center'>
            <span className='titulo'><u>Requisição de Lanche de Bordo/Apoio</u></span>
        </div>

        <div className='topo-center-dois'>
        <div className='topo-center-left'>
          <ol>
            <li>MISSÃO: TRANSPORTE AERO LOGÍSTICO</li>
            <li>AERONAVE TIPO: KC-390 MATRÍCULA: {aviao}</li>
            <li>ORGANIZAÇÃO MILITAR DA ANV/VTR: 1ºGTT</li>
            <li>DATA DA MISSÃO: {data}</li>
            <li>HORA DA DECOLAGEM/PARTIDA: {horas} H</li>
            <li>PROCEDÊNCIA: {origem}</li>
            <li>DESTINO: {destino}</li>
            <li>TIPO DE LANCHE (preenchimento da SUB):</li>
            <li>VALOR DO LANCHE (preenchimento da SUB):</li>
            <li>DURAÇÃO DO VÔO: 03H00MIN</li>
            <li>N° DA ORDEM DE MISSÃO: {omis} 1GTT</li>
          </ol>
        </div>

        <div className='topo-center-right'>
            <table className='borda-tabela'>
              <tr>
                <th>MATERIAL</th>
                <th>QTD</th>
              </tr>
              <tr>
                <td>ÁGUA</td>
                <td>{tripulacao.length} GARRAFAS</td>
              </tr>
              <tr>
                <td>GELO</td>
                <td>-</td>
              </tr>
              <tr>
                <td>CAFÉ</td>
                <td>2,5 LITROS</td>
              </tr>
              <tr>
                <td>COPOS</td>
                <td>{tripulacao.length*2} UNIDADES</td>
              </tr>
              <tr>
                <td>TALHERES</td>
                <td>{tripulacao.length*2} UNIDADES</td>
              </tr>
              <tr>
                <td>GUARDANAPOS</td>
                <td>1 PACOTE</td>
              </tr>
              
            </table>

            <div className='quantidades'>
              <span>QTD LANCHES: {tripulacao.length}</span>
              <span>QTD REFEIÇÕES (CONGELADAS): {tripulacao.length}</span>
            </div>
        </div>
        </div>

        <div className='tripulantes'>
          <table className='borda-tabela'>
            <tr>
              <th>POSTO/GRAD</th>
              <th>NOME COMPLETO</th>
              <th>UNIDADE</th>
            </tr>
           {tripulacao.map(item=>{
            return (
              <tr>
              <td>{item.posto}</td>
              <td>{item.nome_completo}</td>
              <td>1º GTT</td>
            </tr>
            )
           })}
     
       
          </table>
        </div>

        <div className='data'>
            <span>Data da Retirada: _____/_____/_____</span>
            <span className='responsavel'>Responsável:_______________________</span>
        </div>

      </div>
     
    </div>
  )
}

export default Omis
