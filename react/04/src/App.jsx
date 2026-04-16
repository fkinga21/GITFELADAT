import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Kalkulator from './components/Kalkulator';
import SutiJatek from './components/SutiJatek';

function App() {
  const navStyle = { margin: '10px', padding: '10px', background: '#f0f0f0', display: 'inline-block', textDecoration: 'none', color: 'black', borderRadius: '5px' };

  return (
    <Router>
      <div style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h1>🍰 Cukrászda Digitális Menü</h1>
        <nav>
          <Link to="/" style={navStyle}>Rendelés Kalkulátor</Link>
          <Link to="/jatek" style={navStyle}>Süti Játék</Link>
        </nav>

        <div style={{ marginTop: '20px' }}>
          <Routes>
            <Route path="/" element={<Kalkulator />} />
            <Route path="/jatek" element={<SutiJatek />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;