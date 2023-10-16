import React, { useEffect, useState, useRef } from 'react'
import styles from './styles.css'
import {
  CButton,
  CCard,

} from '@coreui/react'
import useApi from 'src/services/Api'
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef } from 'react'
import LoadingSpinner from 'src/components/Loading'
import { useNavigate } from 'react-router-dom';
import moment from 'moment'
import { usePDF } from 'react-to-pdf';
import MaskedObsTextArea from '../../components/masked-inpput-text-obs-textarea'

const RevisarOms = () => {
  const { toPDF, targetRef } = usePDF({filename: 'omis.pdf'});
  const [missoes, setMissoes] = useState([])
  const [missaoSelected, setMissaoSelected] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingRetornar, setLoadingRetornar] = useState(false)
  const [pernoites, setPernoites] = useState([])
  const [meiasDiarias, setMeiasDiarias] = useState([])
  const [idMissaoSelected, setIdMissaoSelected] = useState('')
  const [caixaCreateVisibleRetornar, setCaixaCreateVisibleRetornar] = useState(false)
  const [comentario, setComentario] = useState('')
  const [statusMissao, setStatusMissao] = useState('')

  const pdfRef = useRef(null);
  const Api = useApi()
  const navigate = useNavigate()

  const verifySap = async () => {
    let res = await Api.getPermissoes()
    if(res.error) {
      navigate('/main')
      return
    }
    let index = res.data[0].Permissaos.findIndex(i=>i.permissao == 'sap')
    if(index < 0) {
      navigate('/main')
      return
    }
  }

  const hendleRevisar = async () => {
    let res = await Api.revisarOm(missaoSelected.id)
    if(res.error) {
      alert(res.error)
      return
    }
    alert(res.msg)
    setMissaoSelected('')
    setIdMissaoSelected('')
    getMissoes()
  }

  const handleRevisarAviso = () => {
    const confirmacao = window.confirm('Deseja mesmo revisar essa OM?');
    if (confirmacao) {
      hendleRevisar()
    }
  }

  const handleRetornarRevisaoAviso = () => {
    const confirmacao = window.confirm('Deseja mesmo retornar essa OM para Revisão?');
    if (confirmacao) {
      handleRetornarRevisao()
    }
  }

  const handleAvancarAviso = () => {
    const confirmacao = window.confirm('Deseja mesmo avançar essa OM para revisão?');
    if (confirmacao) {
      handleAvancar()
    }
  }

  const handleAvancar = async () => {
    let res = await Api.finalizarOm(missaoSelected.id)
    if(res.error) {
      alert(res.error)
      return
    }
    setMissaoSelected('')
    setIdMissaoSelected('')
    alert(res.msg)
    getMissoes()
  }

  const handleRetornarRevisao = async () => {
    let res = await Api.retornarMissaoRevisao(missaoSelected.id)
    if(res.error) {
      alert(res.error)
      return
    }
    setComentario('')
    setCaixaCreateVisibleRetornar(false)
    setMissaoSelected('')
    setIdMissaoSelected('')
    alert(res.msg)
    getMissoes()
  }


  const handleRetornar = async () => {
    setLoadingRetornar(true)
    let res = await Api.retornarOm(missaoSelected.id, {texto: comentario})
    if(res.error) {
      setLoadingRetornar(false)
      alert(res.error)
      return
    }
    setLoadingRetornar(false)
    setComentario('')
    setCaixaCreateVisibleRetornar(false)
    setMissaoSelected('')
    setIdMissaoSelected('')
    alert(res.msg)
    getMissoes()
  }

  const handleRetornarAviso = () => {
    setCaixaCreateVisibleRetornar(true)
    console.log('retornou')
  }

  const handleOpenHTML = () => {
    const content = pdfRef.current;
  
    if (content) {
      const htmlContent = content.innerHTML;
      // Crie um novo documento HTML temporário
      const newWindow = window.open();
      const newDocument = newWindow.document;
      // Adicione um link para a folha de estilo CSS ao cabeçalho do novo documento
      const cssLink = newDocument.createElement('link');
      cssLink.href = 'styles.css'; // Substitua pelo caminho real do seu arquivo CSS
      cssLink.rel = 'stylesheet';
      newDocument.head.appendChild(cssLink);
      let css = '<link rel="stylesheet" type="text/css" href="https://1gtt.com.br/styles-sap.css">'
      // Escreva o conteúdo HTML no novo documento
      newDocument.open();
      newDocument.write(css+htmlContent);
      newDocument.close();
    }
  };

  const getMissoes = async () => {
    let res = await Api.getMissoesRevisar()
    if(res.error) {
      alert(res.error)
      return
    } else {
      setMissoes(res.data)
    }
  }

  const handleSelectOmis = async (id) => {
    setMissaoSelected('')
    setLoading(true)
    let res = await Api.getMissao(id)
    if(res.error) {
      alert(res.error)
      setLoading(false)
      return
    } else {
      let missao_get = res.data
      missao_get.Usuarios.sort((a,b)=>a.Antiguidade.antiguidade - b.Antiguidade.antiguidade)
      setMissaoSelected(missao_get)
      setIdMissaoSelected(missao_get.id)
      setLoading(false)
      if(missao_get.finalizada) {
        setStatusMissao('Finalizada')
      }
      if(missao_get.retornada) {
        setStatusMissao('Retornada')
      }
      if(missao_get.revisada) {
        setStatusMissao('Revisada')
      }
      let res_pernoites = await Api.getPernoitesMissao(id)
      if(!res_pernoites.error) {
        setPernoites(res_pernoites.data)
      let res_meias_diarias = await Api.getMeiasDiariasMissao(id)
      if(!res_meias_diarias.error) {
        setMeiasDiarias(res_meias_diarias.data)
      }
      }
      
    }
  }
  
  useEffect(()=>{
    verifySap()
    getMissoes()
  },[])


  return (
    <>
      <CCard className="mb-6" style={{flexDirection: 'column', overflowX: 'auto' }}>
      <div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
      <div className='left-side' >
          {missoes.map(item=>{
            console.log(item)
            if(item.revisada) {
              var status = 'Revisada'
              var classe = 'tag'
            } else {
              if (item.retornada) {
                var status = 'Retornada'
                var classe = 'tag-amarela'
              } else {
                var status = 'Finalizada'
                var classe = 'tag-cinza'
              }
            }
            return (
              
              <div className='item-omis' style={{backgroundColor: idMissaoSelected == item.id ? '#bbb' : '#fff'}} onClick={()=>{handleSelectOmis(item.id)}}>
                <div className={classe}></div>
                <div className='descricao-omis'>
                  <span className='numero'>{item.numero}</span>
                  <span className='numero'>{status}</span>
                </div>
              </div>
            )
          })}
      </div>
      <div className='right-side'>
      {loading && 
      <div  style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}>
        <LoadingSpinner black={true} width="150px" />
      </div>
      }
          {missaoSelected != '' && 
            <>
            {
              statusMissao == 'Finalizada' &&

              <div className='right-side-top' style={{marginTop:10, flex:0.85, display: 'flex', justifyContent: 'center'}}>
                <div style={{cursor:'pointer', backgroundColor: '#000', color: '#fff', padding: 5, borderRadius:10, marginRight:5 }} onClick={handleOpenHTML}>Download PDF</div>
                <div style={{cursor:'pointer', backgroundColor: '#e9d604', color: '#000', padding: 5, borderRadius:10, marginRight:5 }} onClick={handleRetornarAviso}>Retornar OM para Edição</div>
                <div style={{cursor:'pointer', backgroundColor: '#87d030', color: '#000', padding: 5, borderRadius:10 }} onClick={handleRevisarAviso}>Revisar OM</div>
              </div>
            }
             {
              statusMissao == 'Revisada' &&

              <div className='right-side-top' style={{marginTop:10, flex:0.85, display: 'flex', justifyContent: 'center'}}>
                <div style={{cursor:'pointer', backgroundColor: '#000', color: '#fff', padding: 5, borderRadius:10, marginRight:5 }} onClick={handleOpenHTML}>Download PDF</div>
                <div style={{cursor:'pointer', backgroundColor: '#bbb', color: '#000', padding: 5, borderRadius:10, marginRight:5 }} onClick={handleRetornarRevisaoAviso}>Retornar OM para Revisao</div>
              </div>
            }

            {
              statusMissao == 'Retornada' &&

              <div className='right-side-top' style={{marginTop:10, flex:0.85, display: 'flex', justifyContent: 'center'}}>
                <div style={{cursor:'pointer', backgroundColor: '#bbb', color: '#000', padding: 5, borderRadius:10, marginRight:5 }} onClick={handleAvancarAviso}>Avançar para Revisão</div>
              </div>
            }
          <div ref={pdfRef}>
            <div className='cabecalho'>
              <div className='linha-cabecalho'>
                <span className='bold'>Número da Missão:</span>
                <span style={{marginLeft:5}}>{missaoSelected.numero}</span>
              </div>
              <div className='linha-cabecalho'>
                <span className='bold'>Documento Acionador:</span>
                <span style={{marginLeft:5}}>{missaoSelected.Ofrag.numero}</span>
              </div>
              <div className='linha-cabecalho'>
                <span className='bold'>Aeronave:</span>
                <span style={{marginLeft:5}}>{missaoSelected.Etapas[0].Aeronave.aeronave}</span>
              </div>
              <div className='linha-cabecalho'>
                <span className='bold'>Diárias Reais:</span>
                <span style={{marginLeft:5}}>R$ {missaoSelected.diarias_reais}</span>
              </div>
              <div className='linha-cabecalho'>
                <span className='bold'>Diárias Simuladas:</span>
                <span style={{marginLeft:5}}>R$ {missaoSelected.diarias_simuladas}</span>
              </div>
            </div>
            <div className='cabecalho'>
                <div className='linha-cabecalho linha-underline'>
                </div>
              </div>
             <div className='center'>
              <span>Tripulantes:</span>
             </div>
             <div class="table-area">
              <table>
                <tr>
                  <th>Posto</th>
                  <th>Nome Completo</th>
                  <th>SARAM</th>
                  <th>Identidade</th>
                  <th>Status</th>
                  <th>Diárias</th>
                  <th>Dias</th>
                </tr>
                {missaoSelected.Usuarios.map(it=>{
                  let index = missaoSelected.Escalas.findIndex(i=>i.id_militar == it.id)
                  if(index >=0) {
                    var status = missaoSelected.Escalas[index].diaria ? 'Diária' : 'Comissionamento'
                  } else {
                    var status = ''
                  }
                  var dias = 0
                  var meias_diarias = 0
                  for (const meiaDiaria of meiasDiarias) {
                      for (const usuario of meiaDiaria.usuarios) {
                        if(usuario.id_user == it.id) {
                          if(status == 'Diária') {
                            meias_diarias += 0.5
                          } else {
                            dias += 1
                          }
                          
                        }
                      }
                  }
                  var diarias = 0
                  

                  for (const pernoite of pernoites) {
                    for (const usuario of pernoite.usuarios) {
                      if(usuario.id_user == it.id) {
                        const dataHoraInicioMoment = moment.utc(pernoite.inicio);
                        const dataHoraTerminoMoment = moment.utc(pernoite.termino);
                        const diferencaEmDias = dataHoraTerminoMoment.diff(dataHoraInicioMoment, 'days');        
                        
                        if(status == 'Diária') {
                          diarias += diferencaEmDias == 0 ? 1 : diferencaEmDias
                        } else {
                          dias += diferencaEmDias == 0 ? 1 : diferencaEmDias
                        }
                      }
                    }
                }
                  return (
                    <tr>
                      <td>{it.Posto.nome}</td>
                      <td>{it.nome_completo}</td>
                      <td>{it.saram}</td>
                      <td>{it.identidade}</td>
                      <td>{status}</td>
                      <td>{diarias + meias_diarias}</td>
                      <td>{dias}</td>
                    </tr>
                  )
                })}
              </table>
            </div>
            <div className='cabecalho'>
                <div className='linha-cabecalho linha-underline'>
                </div>
              </div>
            <div className='center'>
              <span>Etapas:</span>
             </div>
             <div class="table-area">
             <table>
               <tr>
                  <th>Data</th>
                  <th>Hora Dep (Z)</th>
                  <th>Origem</th>
                  <th>Hora Pouso (Z)</th>
                  <th>Destino</th>
                </tr>
                {missaoSelected.Etapas.map(it=>{
                  const dataHoraDepMoment = moment.utc(it.dep);
                  const dataHoraPousoMoment = moment.utc(it.pouso);
                  return (
                    <tr>
                      <td>{dataHoraDepMoment.format('DD/MM/YYYY')}</td>
                      <td>{dataHoraDepMoment.format('HH:mm')}</td>
                      <td>{it.Dep.icao}</td>
                      <td>{dataHoraPousoMoment.format('HH:mm')}</td>
                      <td>{it.Pouso.icao}</td>
                    </tr>
                  )
                })}
                </table>
             </div>
             <div className='cabecalho'>
                <div className='linha-cabecalho linha-underline'>
                </div>
              </div>

             <div className='center'>
              <span>Pernoites:</span>
             </div>
             {pernoites.length == 0 &&
             <div className='cabecalho'>
              <div className='linha-cabecalho'>
                <span>- Não há</span>
              </div>
             </div>
             }
              {pernoites.map(itm=>{
                const dataHoraInicioMoment = moment.utc(itm.inicio);
                const dataHoraTerminoMoment = moment.utc(itm.termino);
                const diferencaEmDias = dataHoraTerminoMoment.diff(dataHoraInicioMoment, 'days');
                itm.usuarios.sort((a,b)=>a.antiguidade - b.antiguidade)
                return (
                  <>
                  <div style={{pageBreakInside: 'avoid'}}>
                    <div className='cabecalho'>
                        <div className='linha-cabecalho'>
                          <span className='bold'>Localidade:</span>
                          <span className='margin-left'>{itm.cidade.cidade}</span>
                        </div>
                        <div className='linha-cabecalho'>
                          <span className='bold'>Início:</span>
                          <span className='margin-left'>{dataHoraInicioMoment.format('DD/MM/YYYY')} - {dataHoraInicioMoment.format('HH:mm')}Z</span>
                        </div>
                        <div className='linha-cabecalho'>
                          <span className='bold'>Fim:</span>
                          <span className='margin-left'>{dataHoraTerminoMoment.format('DD/MM/YYYY')} - {dataHoraTerminoMoment.format('HH:mm')}Z</span>
                        </div>
                    </div>
                    <div class="table-area">
                      <table>
                        <tr>
                          <th>Posto</th>
                          <th>Nome Completo</th>
                          <th>Status</th>
                          <th>Dias/Diárias</th>
                        </tr>
                        {itm.usuarios.map(it=>{
                            let index = missaoSelected.Escalas.findIndex(i=>i.id_militar == it.id_user)
                            if(index >=0) {
                              var status = missaoSelected.Escalas[index].diaria ? 'Diária' : 'Comissionamento'
                            } else {
                              var status = ''
                            }
                          return (
                            <tr>
                              <td>{it.posto}</td>
                              <td>{it.nome_completo}</td>
                              <td>{status}</td>
                              <td>{diferencaEmDias == 0 ? 1 : diferencaEmDias}</td>
                            </tr>
                          )
                        })}
                      </table>
                    </div>
                    </div>
                  </>
                )
              })}
              <div className='cabecalho'>
                <div className='linha-cabecalho linha-underline'>
                </div>
              </div>
              <div className='center'>
                <span>Meias Diárias:</span>
             </div>
             {meiasDiarias.length == 0 &&
             <div className='cabecalho'>
              <div className='linha-cabecalho'>
                <span>- Não há</span>
              </div>
             </div>
             }
              {meiasDiarias.map(itm=>{
                itm.usuarios.sort((a,b)=>a.antiguidade - b.antiguidade)
                return (
                  <>
                    <div className='cabecalho'>
                        <div className='linha-cabecalho'>
                          <span className='bold'>Localidade:</span>
                          <span className='margin-left'>{itm.cidade.cidade}</span>
                        </div>
                    </div>
                    <div class="table-area">
                      <table>
                        <tr>
                          <th>Posto</th>
                          <th>Nome Completo</th>
                          <th>Status</th>
                          <th>Dias/Diárias</th>
                        </tr>
                        {itm.usuarios.map(it=>{
                            let index = missaoSelected.Escalas.findIndex(i=>i.id_militar == it.id_user)
                            if(index >=0) {
                              var status = missaoSelected.Escalas[index].diaria ? 'Diária' : 'Comissionamento'
                            } else {
                              var status = ''
                            }
                          return (
                            <tr>
                              <td>{it.posto}</td>
                              <td>{it.nome_completo}</td>
                              <td>{status}</td>
                              <td>{status == 'Diária' ? '0,5' : '1'}</td>
                            </tr>
                          )
                        })}
                      </table>
                    </div>
                  </>
                )
              })}
              <div className='cabecalho'>
                <div className='linha-cabecalho linha-underline'>
                </div>
              </div>
              <div style={{pageBreakInside: 'avoid'}}>
              <div className='center'>
                <span>Relato do Comandante:</span>
             </div>
              <div className='cabecalho'>
                <div className='relato'>
                  {missaoSelected.relato ? <p>{missaoSelected.relato}</p> : ''}
                </div>
              </div>
     
              <div className='center'>
                  <span>Assinatura do Comandante:</span>
              </div>
                <div className='center'>
                <img style={{height: 'auto'}} width="200px" src={missaoSelected.assinatura && missaoSelected.assinatura.length > 10 ? "data:image/jpeg;base64, "+missaoSelected.assinatura : "https://1gtt.com.br/falta.png"}/>

                </div>
                <div className='cabecalho'>
                  <span style={{fontSize:'1.3', marginBottom:20}}>{missaoSelected.Usuarios[0].Posto.nome} {missaoSelected.Usuarios[0].nome_guerra}</span>
                </div>
              </div>
            </div>
            </>
          }
      </div>

      { caixaCreateVisibleRetornar && <div className='modal-retornar'>
       <div style={{display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
        <span style={{color: '#fff', fontSize: 24}}>Retornar OM</span>
        <span onClick={()=>{
            setCaixaCreateVisibleRetornar(false)
          }}  className='title-modal' style={{color: '#fff', cursor: 'pointer'}}>X</span>
        </div>
            <div className='modal-body'>
                <div className='item-body-modal' style={{width: '400px'}}>
                  <span className='text-modal' style={{color: '#fff'}}>Comentários:</span>
                </div>
                <MaskedObsTextArea linhas={6} value={comentario} onChange={setComentario} /> 
                </div>

                {loadingRetornar && 
                  <div  style={{display: 'flex', alignItems:'center', justifyContent: 'center'
                  }}>
                    <LoadingSpinner black={false} width="80px" />
                  </div>
                  }

                <div className='modal-bottom'>
                  <button onClick={handleRetornar} className='salvar'>Retornar OM</button>
                </div>
                <div className='modal-bottom'>
                  <button onClick={null} className='excluir'>{'Cancelar'}</button>
                </div>
            </div> }
      </div>
      </CCard>
     
    </>
  )
}

export default RevisarOms
