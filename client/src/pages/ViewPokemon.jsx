import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logoutUser } from "../actions/authActions";
import Navbar from '../components/Navbar';
import API from '../API';
import './style.css';
import PokemonCard from '../components/PokemonCard';
import { colorMixer } from '../color_utils';

/**
 * Component for the view pokemon page
 */
const ViewPokemon = (props) => {
    const [body, setBody] = useState([]);

    useEffect(() => {
        API.getPokemon().then((response) => {
            setBody(response.data.pokemon);
        });
    }, []);

    const currentPokemons = body.map((val) => {
        let types = [val.type1, ...(val.type2 !== ""? [val.type2] : [])]
        let moves = val.moves.map((move) => move.type);
        // [...(val.moves[0].type != ""? [val.moves[0].type] : []),...(val.moves[1].type != ""? [val.moves[1].type] : [])]
        // console.log(moves);
        return (<PokemonCard name={val.name} description={val.description} image={val.image}
            type1={val.type1} type2={val.type2} moves={val.moves} color={colorMixer(types,moves)}></PokemonCard>)
    });

    return (
        <div>
            <Navbar />
            <div className="pokemon">
                {currentPokemons}
            </div>
        </div>
    );
};

ViewPokemon.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(ViewPokemon);