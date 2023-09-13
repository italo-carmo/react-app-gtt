import React from "react";
import "./styles.css";

export default function EtapaItem({dep, data, pouso, alternativa, horaDep, horaPouso, index, edit, del}) {
  var complete = false
  if(dep && pouso && alternativa && horaDep && horaPouso && dep != '' && pouso != '' && alternativa != '' && horaDep != '' && horaPouso != '') {
    complete = true
  }
  return (
        <div className={complete ? "view-etapa complete" : "view-etapa" } >
            <div className={complete ? "complete-text" : "" } style={{color:'#000'}}>{index +1}- {data} - {horaDep} {dep} - {horaPouso} {pouso}</div>
            <div className="botoes-etapa">
                <img src={complete ? "https://www.1gtt.com.br/app/pen-white.png" : "https://www.1gtt.com.br/app/pen.png"} onClick={edit} width={20} height={20}/>
                <img src={complete ? "https://www.1gtt.com.br/app/close-white.png" : "https://www.1gtt.com.br/app/close.png"} onClick={del} width={20} height={20}/>
            </div>
        </div>
  );
}

