const { useState } = React;

// Adatok betöltése a forrásfájl alapján (példák)
const initialSutik = [
    { id: 1, nev: "Süni", tipus: "vegyes", dijazott: 0 },
    { id: 10, nev: "Legényfogó", tipus: "torta", dijazott: -1 },
    { id: 20, nev: "Ribizlihabos-almás réteges", tipus: "különleges torta", dijazott: -1 },
    { id: 66, nev: "Franciakrémes", tipus: "krémes", dijazott: 0 },
    { id: 139, nev: "Mákos guba", tipus: "torta", dijazott: 0 }
];

function App() {
    // STATE-EK (Állapotok)
    // A sütemények listája
    const [sutik, setSutik] = useState(initialSutik); // Logikai változó: éppen szerkesztünk-e vagy új elemet adunk hozzá
    const [isEditing, setIsEditing] = useState(false); // Az űrlapon éppen aktuálisan látható sütemény adatai
    const [currentSuti, setCurrentSuti] = useState({ id: null, nev: '', tipus: '', dijazott: 0 });
// INPUT KEZELÉS: Amikor a felhasználó gépel az űrlapon
    const handleInputChange = (e) => {
        const { name, value } = e.target; // Frissítjük a currentSuti objektumot, a 'dijazott' mezőt számmá alakítjuk
        setCurrentSuti({ ...currentSuti, [name]: name === 'dijazott' ? parseInt(value) : value });
    };

    // Hozzáadás vagy Mentés
    const saveSuti = (e) => {
        e.preventDefault(); // Megakadályozzuk az oldal újratöltődését (form submit)
        if (isEditing) {
            // HA SZERKESZTÉS VAN: megkeressük az ID alapján és lecseréljük az objektumot
            setSutik(sutik.map(s => s.id === currentSuti.id ? currentSuti : s));
            setIsEditing(false);
        } else {
            // HA ÚJ ELEM: generálunk egy új ID-t (legnagyobb ID + 1)
            const nextId = sutik.length > 0 ? Math.max(...sutik.map(s => s.id)) + 1 : 1;
            setSutik([...sutik, { ...currentSuti, id: nextId }]);
        }
        // Az űrlap alaphelyzetbe állítása mentés után
        setCurrentSuti({ id: null, nev: '', tipus: '', dijazott: 0 });
    };

    // Törlés
    const deleteSuti = (id) => {
        if(window.confirm("Biztosan törölni szeretnéd ezt a süteményt?")) {
            // Kiszűrjük azokat, amiknek nem egyezik az ID-ja
            setSutik(sutik.filter(s => s.id !== id));
        }
    };

    // Szerkesztés módba lépés
    const editRow = (suti) => {
        setIsEditing(true); // Bekapcsoljuk a szerkesztési módot
        setCurrentSuti(suti); // Betöltjük a süti adatait az űrlapba
    };

    return (
        <div>
        
            <h1>🍰 Sütemény Nyilvántartás</h1>

            <div className="form-box">
                <form className="suti-form" onSubmit={saveSuti}>
                    <div className="form-group">
                        <label>Sütemény Neve</label>
                        <input 
                            name="nev" 
                            placeholder="Sütemény neve" 
                            value={currentSuti.nev} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Típus</label>
                        <input 
                            name="tipus" 
                            placeholder="Típus (pl. torta, pite)" 
                            value={currentSuti.tipus} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Díj (0 vagy -1)</label>
                        <input 
                            type="number" 
                            name="dijazott" 
                            placeholder="Díj" 
                            value={currentSuti.dijazott} 
                            onChange={handleInputChange} 
                        />
                    </div>
                    
                    <button type="submit" className="btn-primary">
                        {isEditing ? 'Frissítés' : 'Hozzáadás'}
                    </button>
                    
                    {isEditing && (
                        <button type="button" className="btn-primary btn-cancel" onClick={() => { setIsEditing(false); setCurrentSuti({ id: null, nev: '', tipus: '', dijazott: 0 }); }}>
                            Mégse
                        </button>
                    )}
                </form>
            </div>

            
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Sütemény ID</th>
                        <th>Név</th>
                        <th>Típus</th>
                        <th>Díjazott</th>
                        <th>Műveletek</th>
                    </tr>
                </thead>
                <tbody>
                    {sutik.length > 0 ? (
                        sutik.map(s => (
                            <tr key={s.id}>
                                <td>{s.id}</td>
                                <td><strong>{s.nev}</strong></td>
                                <td>{s.tipus}</td>
                                <td>
                                    {s.dijazott === -1 ? "🏆 Díjazott" : "Nem"}
                                </td>
                                <td className="actions">
                                    <button className="btn-edit" onClick={() => editRow(s)}>Szerkeszt</button>
                                    <button className="btn-delete" onClick={() => deleteSuti(s.id)}>Töröl</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="5">Nincs adat a listában.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
// React komponens renderelése a HTML 'root' elembe
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
