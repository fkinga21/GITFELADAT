import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [termekek, setTermekek] = useState([]);
  const [ujSuti, setUjSuti] = useState({ id: '', sutiid: '', ertek: '', egyseg: '' });
  const [szerkesztettSuti, setSzerkesztettSuti] = useState(null);

  // READ
  const fetchData = () => {
    axios.get('http://cukiweb1.nhely.hu/06_axios/api.php')
      .then(res => setTermekek(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => { fetchData(); }, []);

  // CREATE
  const addSuti = () => {
    // Konvertáljuk számmá, hogy össze tudjuk hasonlítani
  const sutiIdSzam = parseInt(ujSuti.sutiid);

  // Ellenőrzés: 1 és 139 között van-e?
  if (isNaN(sutiIdSzam) || sutiIdSzam < 1 || sutiIdSzam > 139) {
    alert("Hiba: A Süti ID-nak 1 és 139 között kell lennie!");
    return; // Itt megállítjuk a folyamatot, nem küldünk semmit
  }

  // Opcionális: Ellenőrzés, hogy az inputok ne legyenek üresek
  if (!ujSuti.sutiid || !ujSuti.ertek) {
    alert("Kérlek, töltsd ki legalább a Süti ID-t és az Árat!");
    return;
  }
  
  axios.post('http://cukiweb1.nhely.hu/06_axios/api/add_ar.php', ujSuti)
    .then(res => {
      // Itt nézzük meg, hogy a PHP mit küldött vissza
      if (res.data.status === "error") {
        // HA HIBA VAN (pl. duplikált ID), itt fogja kiírni az alert
        alert(res.data.message); 
      } else {
        // HA SIKERES
        fetchData();
        setUjSuti({ id: '', sutiid: '', ertek: '', egyseg: '' });
        alert("Sikeres hozzáadás!");
      }
    })
    .catch(err => {
      console.error(err);
      alert("Hiba történt a szerverrel való kommunikációban.");
    });
};


  // DELETE
  const deleteSuti = (id) => {
  // Megerősítő ablak
  if (window.confirm("Biztosan törölni szeretnéd ezt a tételt?")) {
    axios.post('http://cukiweb1.nhely.hu/06_axios/api/delete_ar.php', { id: id })
      .then(() => fetchData())
      .catch(err => console.error("Hiba a törlésnél:", err));
  }
};

  // UPDATE
  const updateSuti = (suti) => {
  // Megerősítő ablak
  console.log("Mentés indítva:", suti);
  if (window.confirm("Biztosan mented a módosításokat ehhez a tételhez?")) {
    axios.post('http://cukiweb1.nhely.hu/06_axios/api/update_ar.php', suti)
      .then(() => {
        setSzerkesztettSuti(null);
        fetchData();
        alert("Sikeres módosítás!"); // Opcionális visszajelzés
      })
      .catch(err => {
      console.error("Hiba történt:", err);
      alert("Hiba: " + err.message);
    });
  }
};

  return (
    <div >
      <h1>🍰Süti Adatbázis Axios Menü - CRUD</h1>
      
      {/* Input mezők a CREATE-hez */}
      <div className="form-box">
        <div className="suti-form">
            <div className="form-group">
              <label htmlFor="id">ID</label>
              <input placeholder="ID" value={ujSuti.id} onChange={e => setUjSuti({...ujSuti, id: e.target.value})} />
            </div>

            <div className="form-group">
              <label htmlFor="sutiid">Süti ID</label>
              <input  type="number"  min="1"  max="139"  placeholder="Süti ID (1-139)" value={ujSuti.sutiid} onChange={e => setUjSuti({...ujSuti, sutiid: e.target.value})}/>
            </div>

            <div className="form-group">
              <label htmlFor="ertek">Ár</label>
              <input placeholder="Ár" value={ujSuti.ertek} onChange={e => setUjSuti({...ujSuti, ertek: e.target.value})} />
            </div>

            <div className="form-group">
              <label htmlFor="egyseg">Egység</label>
              <input placeholder="Pl. db, kg, X szeletes" value={ujSuti.egyseg} onChange={e => setUjSuti({...ujSuti, egyseg: e.target.value})} />
            </div>

            <button className="btn-add" onClick={addSuti}>Hozzáadás</button>
          </div>
      </div>

    
      <table class="data-table">
        <thead><tr><th>ID</th><th>Süti ID</th><th>Ár</th><th>Egység</th><th>Művelet</th></tr></thead>
       <tbody>
          {termekek.map(t => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>
                  {szerkesztettSuti?.id === t.id ? 
                    <input class="tb" value={szerkesztettSuti.sutiid} onChange={e => setSzerkesztettSuti({...szerkesztettSuti, sutiid: e.target.value})} /> : t.sutiid}
              </td>
              <td>
                  {szerkesztettSuti?.id === t.id ? 
                    <input class="tb" value={szerkesztettSuti.ertek} onChange={e => setSzerkesztettSuti({...szerkesztettSuti, ertek: e.target.value})} />  : t.ertek}
              </td>
              <td>
                   {szerkesztettSuti?.id === t.id ? 
                    <input class="tb" value={szerkesztettSuti.egyseg} onChange={e => setSzerkesztettSuti({...szerkesztettSuti, egyseg: e.target.value})} />  : t.egyseg}
              </td>
              <td>
                   {szerkesztettSuti?.id === t.id ? (
                    <button className="btn-save" onClick={() => updateSuti(szerkesztettSuti)}>Mentés</button>
                   ) : (
                    <button className="btn-edit" onClick={() => setSzerkesztettSuti(t)}>Szerkesztés</button>
                    )}
                    <button className="btn-delete" onClick={() => deleteSuti(t.id)}>Törlés</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}
export default App;