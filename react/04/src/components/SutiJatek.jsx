import { useState } from 'react';

export default function SutiJatek() {
  const [pont, setPont] = useState(0);

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Kapd el a Sütit!</h2>
      <p>Eddigi pontszám: **{pont}**</p>
      <div 
        onClick={() => setPont(pont + 1)}
        style={{ fontSize: '50px', cursor: 'pointer', textAlign: 'center', userSelect: 'none' }}
      >
        🧁
      </div>
      <p>Kattints a sütire a pontszerzéshez!</p>
      <button onClick={() => setPont(0)}>Újrakezdés</button>
    </div>
  );
}