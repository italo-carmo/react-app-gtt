import React from "react";
import "./styles.css";

export default function EtapaItem({dep, pouso, horaDep, horaPouso, index, edit, del}) {
  return (
        <div className="view-etapa">
            <div style={{color:'#000'}}>{index +1}- {horaDep} {dep} - {horaPouso} {pouso}</div>
            <div className="botoes-etapa">
                <img src="https://www.1gtt.com.br/app/pen.png" onClick={edit} width={20} height={20}/>
                <img src="https://www.1gtt.com.br/app/close.png" onClick={del} width={20} height={20}/>
            </div>
        </div>
  );
}

