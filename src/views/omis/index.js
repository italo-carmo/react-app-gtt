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
/*
  let tripulacao = [
    {
      funcao: 'Piloto', 
    nome_completo: "RODRIGO OTÁVIO STARLING TIRADENTES",
    identidade: '563396',
    saram: '4310489',
    posto: 'CP'
    },
    {
      funcao: 'Piloto', 
    nome_completo: "ÍTALO BRUNO SANT'ANNA DO CARMO",
    identidade: '563397',
    saram: '4311388',
    posto: 'CP'
    },
    {
      funcao: 'Piloto', 
    nome_completo: "RICHARLISSON JAQUES ALVES",
    identidade: '574164',
    saram: '4493249',
    posto: 'CP'
    },
    {
      funcao: 'Mecânico de Voo', 
    nome_completo: "SENILDO JOSÉ DE SOUZA",
    identidade: '476096',
    saram: '2753502',
    posto: '1T'
    },
    {
      funcao: 'Loadmaster', 
    nome_completo: "OTONIEL ELIAS DOS REIS -",
    identidade: '3573362',
    saram: '3573362',
    posto: 'SO'
    },
    {
      funcao: 'Loadmaster', 
    nome_completo: "THIAGO LOURENÇO DOS SANTOS",
    identidade: '544824',
    saram: '4421825',
    posto: '2S'
    },
    {
      funcao: 'Loadmaster', 
    nome_completo: "HORLISTEN ELIAS DE BARROS",
    identidade: '470155',
    saram: '3650243',
    posto: 'SO'
    },
    {
      funcao: 'Comissário', 
    nome_completo: "WAGNO FELIX DA SILVA",
    identidade: '543581',
    saram: '3996581',
    posto: '2S'
    },

  ]

  let etapas = [
    {
      data: '26/06/2023',
      horaDep: '10:00',
      dep: 'SBAN',
      horaPouso: '11:20',
      pouso: 'SBGL',
      tev: '01:20',
      solo: '01:50',
      alternativa: 'SBGR',
      tev_alt: '00:30',
      combustivel: '12000'
    },
    {
      data: '26/06/2023',
      horaDep: '13:10',
      dep: 'SBGL',
      horaPouso: '13:40',
      pouso: 'SBGR',
      tev: '00:30',
      solo: '02:00',
      alternativa: 'SBGL',
      tev_alt: '00:30',
      combustivel: '12000'
    },
    {
      data: '26/06/2023',
      horaDep: '15:40',
      dep: 'SBGR',
      horaPouso: '19:05',
      pouso: 'SBPV',
      tev: '03:35',
      solo: '02:00',
      alternativa: 'SBRB',
      tev_alt: '00:30',
      combustivel: '12000'
    },
    {
      data: '26/06/2023',
      horaDep: '10:00',
      dep: 'SBAN',
      horaPouso: '11:20',
      pouso: 'SBGL',
      tev: '01:20',
      solo: '01:50',
      alternativa: 'SBGR',
      tev_alt: '00:30',
      combustivel: '12000'
    },
    {
      data: '26/06/2023',
      horaDep: '10:00',
      dep: 'SBAN',
      horaPouso: '11:20',
      pouso: 'SBGL',
      tev: '01:20',
      solo: '01:50',
      alternativa: 'SBGR',
      tev_alt: '00:30',
      combustivel: '12000'
    }
  ]*/

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  // Extrair os parâmetros da query string e convertê-los de volta em arrays
  const dados_params = params.get('dados');

  const dados = JSON.parse(decodeURIComponent(dados_params));
  console.log(dados)
  if(dados) {
    var tripulacao = dados.tripulacao
    var etapas = dados.etapas
    var comandante = dados.comandante
    var data = dados.data
    var aviao = dados.aviao
    var ofrag = dados.ofrag
    var horas = dados.horas
    var omis = dados.omis
  } else {
    var tripulacao = []
    var etapas = []
    var comandante = ''
    var data = ''
    var aviao = ''
    var ofrag = ''
    var horas = ''
    var omis = ''
  }


  return (
    <div>
      <div className='topo'>
        <div className='left-topo'>
          <img width='80px' src='https://www.1gtt.com.br/app/gtt.png'/>
        </div>
        <div className='cabecalho'>
            <h5>COMANDO DA AERONÁUTICA</h5>
            <h5>BAAN</h5>
            <h5>1º GRUPO DE TRANSPORTE DE TROPA</h5>
        </div>
        <div className='right-topo'>

        </div>
      </div>

      <div className='div-numero-ordem'>
        <div className='ordem-de-missao'>
          <span className='ordem-demissao-bold'>Ordem de Missão:</span>
          <span className='numero'>{omis} / 1º GTT</span>
        </div>
        <div className='div-data'>
            <span className='data-bold'>Data:</span>
            <span className='data'>{data}</span>
        </div>
      </div>

      <div className='div-comandante-esforco'>
        <div className='div-comandante'>
        <span className='ordem-de-missao-bold'>Comandante:</span>
          <span className='numero'>{comandante}</span>
        </div>
        <div className='div-esforco'>
            <span className='data-bold'>Esforço Aéreo:</span>
            <span className='data'>{horas}</span>
        </div>
      </div>

      <div className='tripulantes-title'>
        <h6 style={{fontWeight:'bold'}}>Tripulantes</h6>
      </div>

      <div className='div-aeronave'>
        <span className='data-bold'>Aeronave:</span>
        <span className='numero'>{aviao}</span>
      </div>

      <div className='div-tripulacao'>
        <div className='div-pilotos'>
          <span className='data-bold'>Pilotos</span>
        </div>
        {tripulacao.map(item=>{
          if(item.funcao == 'Piloto') {
            return (
              <div className='div-tripulante'> 
                <span className='tripulante'>{item.posto} {item.nome_completo} - IDENTIDADE ({item.identidade}) - SARAM ({item.saram})</span>
              </div>
            )
          }
        })}
        <div>

        </div>
      </div>

      <div className='div-tripulacao'>
        <div className='div-pilotos'>
          <span className='data-bold'>Mecânicos</span>
        </div>
        {tripulacao.map(item=>{
          if(item.funcao == 'Mecânico de Voo') {
            return (
              <div className='div-tripulante'> 
                <span className='tripulante'>{item.posto} {item.nome_completo} - IDENTIDADE ({item.identidade}) - SARAM ({item.saram})</span>
              </div>
            )
          }
        })}
        <div>

        </div>
      </div>

      <div className='div-tripulacao'>
        <div className='div-pilotos'>
          <span className='data-bold'>Loadmasters</span>
        </div>
        {tripulacao.map(item=>{
          if(item.funcao == 'Loadmaster') {
            return (
              <div className='div-tripulante'> 
                <span className='tripulante'>{item.posto} {item.nome_completo} - IDENTIDADE ({item.identidade}) - SARAM ({item.saram})</span>
              </div>
            )
          }
        })}
        <div>

        </div>
      </div>

      <div className='div-tripulacao'>
        <div className='div-pilotos'>
          <span className='data-bold'>Comissários</span>
        </div>
        {tripulacao.map(item=>{
          if(item.funcao == 'Comissário') {
            return (
              <div className='div-tripulante'> 
                <span className='tripulante'>{item.posto} {item.nome_completo} - IDENTIDADE ({item.identidade}) - SARAM ({item.saram})</span>
              </div>
            )
          }
        })}
        <div>

        </div>
      </div>

      <div className='div-tripulacao'>
        <div className='div-pilotos'>
          <span className='data-bold'>OE-3</span>
        </div>
        {tripulacao.map(item=>{
          if(item.funcao == 'OE') {
            return (
              <div className='div-tripulante'> 
                <span className='tripulante'>{item.posto} {item.nome_completo} - IDENTIDADE ({item.identidade}) - SARAM ({item.saram})</span>
              </div>
            )
          }
        })}
        <div>

        </div>
      </div>

      <div className='tripulantes-title'>
        <h6 style={{fontWeight:'bold'}}>Rota</h6>
      </div>
      
      <div className='div-rota-table'>

      <table>
        <tr>
          <th>DATA</th>
          <th>HORA (Z)</th>
          <th>DEP</th>
          <th>ETA (Z)</th>
          <th>ARR</th>
          <th>TEV</th>
          <th>TEMP SOLO</th>
          <th>ALT</th>
          <th>TEV ALT</th>
          <th>COMB</th>
        </tr>
        {
          etapas.map(item=>{
            return(
              <tr>
                <td>{item.data}</td>
                <td>{item.horaDep}</td>
                <td>{item.dep}</td>
                <td>{item.horaPouso}</td>
                <td>{item.pouso}</td>
                <td>{item.tev}</td>
                <td>{item.solo}</td>
                <td>{item.alternativa}</td>
                <td>{item.tev_alt}</td>
                <td>{item.combustivel}</td>
              </tr>
            )
          })
        }
      </table>
      </div>

      <div className='ordens-especiais'>
        <h6 style={{fontWeight:'bold', textAlign: 'center'}}>Ordens Especiais</h6>
        <span className='ordem'>1 - O CMT ANV DEVERÁ JUSTIFICAR NO RELATÓRIO FINAL DE MISSÃO QUALQUER ATRASO
SUPERIOR A 15 MIN, EM QUALQUER PERNA DESCRITA NA OM;</span>
        <span className='ordem'>2 - ANORMALIDADES DA MISSÃO DEVEM SER IMEDIATAMENTE REPORTADAS AO OCC DA BAAN
(62) 99948-9751;</span>
        <span className='ordem'>3 - CONFIGURAÇÃO INICIAL: 36 ASSENTOS + 7 PALLETS;</span>
        <div className='bottom-ordens'>
          <div className='ofrag-div'>
            <span className='ofrag-bold'>OFRAG:</span>
            <span>{ofrag}</span>
          </div>
          <div className='ofrag-div'>
            <span className='ofrag-bold'>Esforço Aéreo:</span>
            <span>CONFORME OFRAG</span>
          </div>
        </div>
      </div>

      <div className='assinatura'>
        <div className='operacoes'>
          <div><span className='nome'>RAFAEL PORTELLA SANTOS Maj Av</span></div>
          <div><span>Operações</span></div>
        </div>
        <div className='comandante'>
       <div><span className='nome'>BRUNO AMÉRICO PEREIRA Ten Cel Av</span></div>
        <div><span>Comandante</span></div>
        </div>
      </div>

     
    </div>
  )
}

export default Omis
