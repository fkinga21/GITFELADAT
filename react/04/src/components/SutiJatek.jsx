import { useState } from 'react';
import './SutiJatek.css'; 

export default function SutiJatek() {
  const [pont, setPont] = useState(0);
 
  const [pozicio, setPozicio] = useState({ top: 50, left: 50 });

  function kattintasASutire() {

    setPont(pont + 1);

    const ujTop = Math.random() * 80 + 5; 
    const ujLeft = Math.random() * 80 + 5;

    setPozicio({ top: ujTop, left: ujLeft });
  }
  
  
  function ujrakezdes() {
    setPont(0);
    setPozicio({ top: 50, left: 50 });
  }

 

  return (
    
    <> 
      <div className="jatek-terulet">
        <h2>Kapd el a Sütit!</h2>
        <p>Eddigi pontszám: **{pont}**</p>
        
        <div className="suti-tarolo">
          <span 
            className="suti-ikon"
            style={{ 
              top: `${pozicio.top}%`, 
              left: `${pozicio.left}%` 
            }}
            onClick={kattintasASutire}
            role="img" 
            aria-label="cupcake"
          >
            🧁
          </span>
        </div>
      </div>
      
      <button  onClick={ujrakezdes}>Újrakezdés</button>

    </> 
  );
}