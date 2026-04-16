import { useState } from 'react';

export default function Kalkulator() {
  const [db, setDb] = useState(0);
  const ar = 850; // Egy szelet torta ára

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Torta Rendelés</h2>
      <p>Dobostorta szelet ára: **{ar} Ft**</p>
      <button onClick={() => setDb(db + 1)}> + Hozzáad </button>
      <button onClick={() => setDb(Math.max(0, db - 1))}> - Elvesz </button>
      <h3>Összesen: {db} szelet = **{db * ar} Ft**</h3>
    </div>
  );
}