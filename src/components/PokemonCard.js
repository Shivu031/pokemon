import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PokemonCard = ({ pokemon }) => {
    const [image, setImage] = useState('');

    useEffect(() => {
        const fetchPokemonDetails = async () => {
          try {
            const response = await axios.get(pokemon.url);
            setImage(response.data.sprites.front_default);
          } catch (error) {
            console.error('Error fetching Pokémon details:', error);
          }
        };
        fetchPokemonDetails();
    }, [pokemon.url]);

  return (
    <div className="card" style={{width: '18rem'}}>
        <img src={image} alt={pokemon.name} className="card-img-top"/>
        <div className="card-body">
            <h5 className="card-title">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h5>
        </div>
    </div>
  )
}

export default PokemonCard
