import React, { Component, useEffect, useState } from 'react';
import logoImg from '../../assets/logo.png';
import searchImg from '../../assets/search.png';
import PokemonList from '../pokemon/PokemonList';

const NavBar = () => {
    const [searchString, setSearchString] = useState('');
    const handleSearchChange = (e) => {
        setSearchString(e.target.value);
    };

    // const filteredItems = items

    

    return (
        <div>
            <nav>
                <div className='logo'>
                    <img src={logoImg} />
                </div>
                <div className='search'>
                    <input className='search-bar' placeholder='Enter Pokémon Name or ID' onChange={handleSearchChange}>
                    </input>
                    <button className="search-button"><img src={searchImg} alt="search-icon"/></button>
                </div>
            </nav>
            <PokemonList items={searchString} />
        </div>
  )
}

export default NavBar
