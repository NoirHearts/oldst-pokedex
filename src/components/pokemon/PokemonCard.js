import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Sprite = styled.img`
        width: 7em;
        height: 7em;
        `;

const Card = styled.div`
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        &:hover {
            box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
            background-color: #003a70;
            color: #Ffcb05;
        }
        -moz-user-select: none;
        -website-user-select: none;
        user-select: none;
        -o-user-select: none;
        
        `;

const StyledLink = styled(Link)`
        text-decoration: none;
        color: #003a70;
        &:focus, &:hover, &:active, &:visited, &:link {
            text-decoration: none;
        }
    `;

export default class PokemonCard extends Component {
    state = {
        name: '',
        pkImage: '',
        pkIndex: '',
        pkTypes: '',
        imageLoading: true,
        reqErrors: false,
    };

    async componentDidMount () {
        const {name, url} = this.props;

        // get index
        const pkIndex = url.split('/')[url.split('/').length - 2 ];

        // get image
        const pkIndexStr = pkIndex.toString();
        let newIndex;

        if (pkIndexStr.length < 3) {
            newIndex = "0".repeat(3 - pkIndexStr.length) + pkIndexStr;
        } else {
            newIndex = pkIndex;
        };
        
        const pkImage = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${newIndex}.png`;
        

        // get types
        const pokemonDetailsResponse = await axios.get(url);
        const types = pokemonDetailsResponse.data.types.map((type) => type.type.name);
        const pkTypes = types.join(', ');

        this.setState({
            name,
            pkImage,
            pkIndex,
            pkTypes,
        });
    }
    render() {

        return (
            <div className='col-md-3 col-sm-6 mb-5'>
                <StyledLink to={`pokemon/${this.state.pkIndex}`} >
                <Card className='card'>
                    <div className='card-header'>
                        <h4>{this.state.pkIndex} </h4>
                    </div>
                    <div className='card-image'>
                        <Sprite className='card-img-top rounded mx-auto mt-2' alt={this.state.name} src={this.state.pkImage}
                        onLoad={() => this.setState({imageLoading: false})}
                        onError={() =>  this.setState({reqErrors: true})}
                        />
                        {this.state.reqErrors ? (<h6 className='mx-auto'><span className='badge badge-danger mt-2'>Too Many Requests</span></h6>) : null}
                        <div className='card-body'>
                        <h3 className='pokemon-name'>{this.state.name}</h3>
                        <h6 className='pokemon-name'>Type: {this.state.pkTypes}</h6>
                        </div>

                    </div>
                </Card>
                </StyledLink>
            </div>
        )
    }
}