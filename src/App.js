import './App.css';
import Dashboard from './components/layout/Dashboard';
import NavBar from './components/layout/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Pokemon from './components/pokemon/Pokemon';

function App() {
  return (
    <Router>
    <div className="App">
      <NavBar />
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/pokemon/:pkIndex" element={<Pokemon />} />
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
