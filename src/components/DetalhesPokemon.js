import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function DetalhesPokemon() {
  const { nome } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const carregarDetalhesPokemon = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nome}`);
        setPokemon(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    carregarDetalhesPokemon();
  }, [nome]);

  if (!pokemon) {
    return <div>Carregando detalhes...</div>;
  }

  const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return (
    <div>
      <h1>Detalhes - {pokemonName}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemonName} />
      <p>Altura: {pokemon.height}</p>
      <p>Peso: {pokemon.weight}</p>
      <p>Tipo(s): {pokemon.types.map((type) => type.type.name).join(', ')}</p>
      <p>Habilidades: {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}</p>
      <p>Estatísticas:</p>
      <ul>
        {pokemon.stats.map((stat) => (
          <li key={stat.stat.name}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DetalhesPokemon;
