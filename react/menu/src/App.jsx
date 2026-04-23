import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SutiSzamlalo from './components/Kalkulator';
import SutiLista from './components/SutiJatek';

function App() {
  const navStyle = { margin: '10px', padding: '10px', background: '#df80df', display: 'inline-block', textDecoration: 'none', color: 'white', borderRadius: '5px' };

  return (
    <Router>
      <div style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h1>🍰 Cukrászda Digitális Menü</h1>
        <nav>
          <Link to="/" style={navStyle}>Süti Számláló</Link>
          <Link to="/jatek" style={navStyle}>Süti Játék</Link>
        </nav>

        <div style={{ marginTop: '20px' }}>
          <Routes>
            <Route path="/" element={<SutiSzamlalo />} />
            <Route path="/jatek" element={<SutiLista />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;