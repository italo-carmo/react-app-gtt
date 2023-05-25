import React from "react";
import "./styles.css";

export default function EtapaItem({dep, pouso, horaDep, horaPouso, index}) {
  return (
        <div className="view-etapa">
            <div style={{color:'#000'}}>{index +1}- {horaDep} {dep} - {horaPouso} {pouso}</div>
        </div>
  );
}

