import React from "react";
import "./styles.css";

export default function LoadingSpinner({black = null, width = '40px'}) {
  return (
    <div class="spinner">
      <img class="fas fa-plane" src={black ? "https://www.1gtt.com.br/app/rec-black.png" : "https://www.1gtt.com.br/app/rec.png"} width={width}/>
    </div>
  );
}