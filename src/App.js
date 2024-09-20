import './app.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from './components/PokemonCard';
import Searchbar from './components/Searchbar';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [currentUrl, setCurrentUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(currentUrl);
        const pokemonData = response.data.results;
        setPokemons(pokemonData);
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };
    fetchPokemons();
  }, [currentUrl]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Pokemon List</h1>
      <Searchbar search={search} onSearchChange={handleSearch} />
      <div className="pokemonList">
        {filteredPokemons.map((pokemon, index) => (
          <PokemonCard key={index} pokemon={pokemon} />
        ))}
      </div>
      <div className="pagination">
        {prevUrl && <button onClick={() => setCurrentUrl(prevUrl)}>Previous</button>}
        {nextUrl && <button onClick={() => setCurrentUrl(nextUrl)}>Next</button>}
      </div>
    </div>
  );
}

export default App;
