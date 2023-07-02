import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ListaPokemons from './components/ListaPokemons';
import DetalhesPokemon from './components/DetalhesPokemon';
import './style.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ListaPokemons} />
        <Route path="/detalhes/:nome" component={DetalhesPokemon} />
      </Switch>
    </Router>
  );
}

export default App;
