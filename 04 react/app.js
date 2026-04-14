import React, { useState } from 'react';

function ArKalkulator() {
    const [ar, setAr] = useState(0);
    const [db, setDb] = useState(1);

    return (
        <div className="app-card">
            <h3>💰 Sütemény Árkalkulátor</h3>
            <div className="input-field">
                <label>Egységár (Ft):</label>
                <input type="number" value={ar} onChange={(e) => setAr(Number(e.target.value))} />
            </div>
            <div className="input-field">
                <label>Darabszám:</label>
                <input type="number" value={db} min="1" onChange={(e) => setDb(Number(e.target.value))} />
            </div>
            <div className="result-box">
                <p>Várható végösszeg:</p>
                <h2>{ar * db} Ft</h2>
            </div>
        </div>
    );
}


function KinalatKezelo() {
    const [list, setList] = useState([
        { id: 1, nev: 'Süni', kész: true },
        { id: 2, nev: 'Legényfogó', kész: false }
    ]);
    const [ujSuti, setUjSuti] = useState('');

    const hozzaadas = () => {
        if (ujSuti.trim()) {
            setList([...list, { id: Date.now(), nev: ujSuti, kész: false }]);
            setUjSuti('');
        }
    };

    return (
        <div className="app-card">
            <h3>📝 Mai kínálat összeállítása</h3>
            <div className="add-suti">
                <input value={ujSuti} onChange={(e) => setUjSuti(e.target.value)} placeholder="Új sütemény..." />
                <button onClick={hozzaadas}>Hozzáad</button>
            </div>
            <ul>
                {list.map(suti => (
                    <li key={suti.id} style={{ textDecoration: suti.kész ? 'line-through' : 'none' }}>
                        {suti.nev}
                        <button onClick={() => setList(list.map(item => item.id === suti.id ? {...item, kész: !item.kész} : item))}>
                            {suti.kész ? 'Vissza' : 'Kész'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// FŐ SPA ALKALMAZÁS
export default function App() {
    const [tab, setTab] = useState('home');

    return (
        <div className="spa-wrapper">
            <nav className="main-nav">
                <button className={tab === 'calc' ? 'active' : ''} onClick={() => setTab('calc')}>Árkalkulátor</button>
                <button className={tab === 'list' ? 'active' : ''} onClick={() => setTab('list')}>Napi Kínálat</button>
            </nav>

            <main className="spa-content">
                {tab === 'home' && (
                    <div className="welcome">
                        <h2>Üdvözöljük a Cukrászda React moduljában!</h2>
                        <p>Kérjük, válasszon a fenti menüpontok közül.</p>
                    </div>
                )}
                {tab === 'calc' && <ArKalkulator />}
                {tab === 'list' && <KinalatKezelo />}
            </main>
        </div>
    );
}