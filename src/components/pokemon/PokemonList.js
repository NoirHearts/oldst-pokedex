import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import logoImg from '../../assets/logo.png';
import searchImg from '../../assets/search.png';

const PokemonList = () => {
    const [pokemon, setPokemon] = useState(null);
    const [filterTerm, setFilterTerm] = useState('');
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=1010&offset=0';

    useEffect(() => {
        const fetchPokemon = async () => {
            const resp = await axios.get(url);
            setPokemon(resp.data.results);
        };

        fetchPokemon();
    }, [url]);

    const filteredPokemon = pokemon ? pokemon.filter(poke => poke.name.includes(filterTerm.toLowerCase())) : [];

    return (
        <React.Fragment>
            <nav>
                <div className='logo'>
                    <img src={logoImg} />
                </div>
                <div className='search'>
                    <input className='search-bar' placeholder='Enter Pokémon Name'value={filterTerm} onChange={(e) => setFilterTerm(e.target.value)}>
                    </input>
                    <button className="search-button"><img src={searchImg} alt="search-icon"/></button>
                </div>
            </nav>
            <div className='pk-container'>
            {filteredPokemon.length ? (
                <div className='row'>
                    {filteredPokemon.map(poke => (
                        <PokemonCard
                            key={poke.name}
                            name={poke.name}
                            url={poke.url}
                        />
                    ))}
                </div>
            ) : (
                <h2 className='loading-text'>No matching Pokemons found.</h2>
            )}
            </div>
        </React.Fragment>
    );
};

export default PokemonList;