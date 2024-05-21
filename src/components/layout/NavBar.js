import React, { Component } from 'react';
import logoImg from '../../assets/logo.png';
import searchImg from '../../assets/search.png';

export default class NavBar extends Component {
    render() {
        return (
            <div>
                <nav>
                    <div className='logo'>
                        <img src={logoImg} />
                    </div>
                    <div className='search'>
                        <input className='search-bar' placeholder='Enter Pokémon Name or ID'>
                        </input>
                        <button className="search-button"><img src={searchImg} /></button>
                    </div>
                </nav>
            </div>
        )
    }
}