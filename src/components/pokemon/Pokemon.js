import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
// import PokemonCard from './PokemonCard';

const Sprite = styled.img`
        width: 7em;
        height: 7em;
        `;

const TYPE_COLORS = {
    bug: 'B1C12E',
    dark: '4F3A2D',
    dragon: '755EDF',
    electric: 'FCBC17',
    fairy: 'F4B1F4',
    fighting: '823551D',
    fire: 'E73B0C',
    flying: 'A3B3F7',
    ghost: '6060B2',
    grass: '74C236',
    ground: 'D3B357',
    ice: 'A3E7FD',
    normal: 'C8C4BC',
    poison: '934594',
    psychic: 'ED4882',
    rock: 'B9A156',
    steel: 'B5B5C3',
    water: '3295F6'
    };

export default class Pokemon extends Component {
    state = {
        name: '',
        pkIndex: '',
        pkImage: '',
        types: [],
        description: '',
        statTitleWidth: 3,
        statBarWidth: 9,
        stats: {
            hp: '',
            attack: '',
            defense: '',
            speed: '',
            specialAttack: '',
            specialDefense: '',
        },
        height: '',
        weight: '',
        // eggGroup: '',
        // catchRate: '',
        abilities: '',
        // genderRatioMale: '',
        // genderRatioFemale: '',
        evs: '',
        // hatchSteps: '',
        themeColor: '#EF5350'
    };

    async componentDidMount() {
        const { pkIndex } = this.props.match.params;
        

        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pkIndex}/`;
        // const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pkIndex}/`;


        const pkRes = await axios.get(pokemonUrl);

        // // converting digits of length < 3 
        // const pkIndexStr = pkIndex.toString();
        // let newIndex;

        // if (pkIndexStr.length < 3) {
        //     newIndex = "0".repeat(3 - pkIndexStr.length) + pkIndexStr;
        // } else {
        //     newIndex = pkIndex;
        // };
        // const pkImage = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${newIndex}.png`;
        
        const name = pkRes.data.name;
        const pkImage = pkRes.data.sprites.front_default;
        // const pkImage = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pkIndex}.png`;


        let { hp, attack, defense, speed, specialAttack, specialDefense } = '';

        pkRes.data.stats.map(stat => {
            switch(stat.stat.name) {
                case 'hp':
                    hp = stat['base_stat'];
                    break;
                case 'attack':
                    attack = stat['base_stat'];
                    break;
                case 'defense':
                    defense = stat['base_stat'];
                    break;
                case 'speed':
                    speed = stat['base_stat'];
                    break;
                case 'special-attack':
                    specialAttack = stat['base_stat'];
                    break;
                case 'special-defense':
                    specialDefense = stat['base_stat'];
                    break;
                default:
                    break;
            }
        });
        // const pkSpeciesResp = await axios.get(pokemonSpeciesUrl);

        // decimeters to feet and rounding off
        const height = Math.round((pkRes.data.height /10));
        const weight = Math.round((pkRes.data.weight /10));

        const types = pkRes.data.types.map(type => type.type.name);

        const themeColor = `${TYPE_COLORS[types[types.length - 1]]}`;

        const abilities = pkRes.data.abilities;
            // .map(ability => {
            // return ability.ability.name
            //     .toLowerCase()
            //     .split('-')
            //     .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            //     .join(' ');
            // })
            // .join(', ');

        const evs = pkRes.data.stats
        .filter(stat => {
            if (stat.effort > 0) {
            return true;
            }
            return false;
        });

      
        this.setState({
        name,
        pkIndex,
        pkImage,
        types,
        stats: {
            hp,
            attack,
            defense,
            speed,
            specialAttack,
            specialDefense
        },
        themeColor,
        height,
        weight,
        abilities,
        evs,
        });
    }
    render() {

        return (
            <div className="col">
                <h6>{this.state.name}</h6>
            {/* <div className="card">
              <div className="card-header">
                <div className="row">
                  <div className="col-5">
                    <h5>{this.state.pokemonIndex}</h5>
                  </div>
                  <div className="col-7">
                    <div className="float-right">
                      {this.state.types.map(type => (
                        <span
                          key={type}
                          className="badge badge-pill mr-1"
                          style={{
                            backgroundColor: `#${TYPE_COLORS[type]}`,
                            color: 'white'
                          }}
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row align-items-center">
                  <div className=" col-md-3 ">
                    <img
                      src={this.state.imageUrl}
                      className="card-img-top rounded mx-auto mt-2"
                    />
                  </div>
                  <div className="col-md-9">
                    <h4 className="mx-auto">
                      {this.state.name}
                    </h4>
                    <div className="row align-items-center">
                      <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                        HP
                      </div>
                      <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                        <div className="progress">
                          <div
                            className="progress-bar "
                            role="progressbar"
                            style={{
                              width: `${this.state.stats.hp}%`,
                              backgroundColor: `#${this.state.themeColor}`
                            }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <small>{this.state.stats.hp}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row align-items-center">
                      <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                        Attack
                      </div>
                      <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                        <div className="progress">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                              width: `${this.state.stats.attack}%`,
                              backgroundColor: `#${this.state.themeColor}`
                            }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <small>{this.state.stats.attack}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row align-items-center">
                      <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                        Defense
                      </div>
                      <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                        <div className="progress">
                          <div
                            className="progress-bar "
                            role="progressbar"
                            style={{
                              width: `${this.state.stats.defense}%`,
                              backgroundColor: `#${this.state.themeColor}`
                            }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <small>{this.state.stats.defense}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row align-items-center">
                      <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                        Speed
                      </div>
                      <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                        <div className="progress">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                              width: `${this.state.stats.speed}%`,
                              backgroundColor: `#${this.state.themeColor}`
                            }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            >
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-6">
                        <h6 className="float-right">Abilities:</h6>
                      </div>
                      <div className="col-6">
                        <h6 className="float-left">{this.state.abilities}</h6>
                      </div>
                      <div className="col-6">
                        <h6 className="float-right">EVs:</h6>
                      </div>
                      <div className="col-6">
                        <h6 className="float-left">{this.state.evs}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div> */}
          </div>
        );
    }
}