import { useState } from 'react';
import './SutiJatek.css'; 

export default function SutiSzamlalo() {
  const [sutik, setSutik] = useState([
    { id: 1, nev: 'Dobostorta', ar: 850, db: 0 },
    { id: 2, nev: 'Eszterházy torta', ar: 950, db: 0 },
    { id: 3, nev: 'Macaron', ar: 450, db: 0 }
  ]);


  const modositMennyiseget = (id, delta) => {
    setSutik(sutik.map(suti => 
      suti.id === id ? { ...suti, db: Math.max(0, suti.db + delta) } : suti
    ));
  };

  return (
    <div className="jatek-terulet">
      <h2>Választható Sütemények</h2>
      {sutik.map(suti => (
        <div key={suti.id} style={{ margin: '10px 0', borderBottom: '1px solid #ccc' }}>
          <span>{suti.nev} - {suti.ar} Ft/db</span>
          <br />
          <button className="mini-gomb" onClick={() => modositMennyiseget(suti.id, 1)}>+</button>
          <span> {suti.db} db </span>
          <button className="mini-gomb" onClick={() => modositMennyiseget(suti.id, -1)}>-</button>
        </div>
      ))}
      <h3>Összesen: {sutik.reduce((sum, suti) => sum + (suti.db * suti.ar), 0)} Ft</h3>
    </div>
  );
}