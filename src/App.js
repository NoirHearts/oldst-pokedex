import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Pokemon from './components/pokemon/Pokemon';
import PokemonList from './components/pokemon/PokemonList';

function App() {
  return (
    <Router>
    <div className="App">
        <Routes>
          <Route exact path="/" element={<PokemonList />} />
          <Route exact path="/pokemon/:pkIndex" element={<Pokemon />} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
