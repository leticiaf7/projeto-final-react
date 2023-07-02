import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ListaPokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    const carregarPokemons = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${(pagina - 1) * 10}`);
        setPokemons(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    carregarPokemons();
  }, [pagina]);

  const carregarSprite = async (url, index) => {
    try {
      const response = await axios.get(url);
      const sprite = response.data.sprites.front_default;
      const updatedPokemons = [...pokemons];
      updatedPokemons[index].sprite = sprite;
      setPokemons(updatedPokemons);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    pokemons.forEach((pokemon, index) => {
      carregarSprite(pokemon.url, index);
    });
  }, [pokemons]);

  const pokemonName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div>
      <h1>Pokémons</h1>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.name} className='card'>
            <Link to={`/detalhes/${pokemon.name}`}>
              {pokemon.sprite && <img src={pokemon.sprite} alt={pokemon.name}/>}
              {pokemonName(pokemon.name)}
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => setPagina((prevPagina) => prevPagina - 1)} disabled={pagina === 1}>
          Anterior
        </button>
        <button onClick={() => setPagina((prevPagina) => prevPagina + 1)}>Próxima</button>
      </div>
    </div>
  );
}

export default ListaPokemons;
