import axios from 'axios';

const server = (process.env.NODE_ENV === 'production') ? 'https://pokemon-battle-pogchamp.herokuapp.com' : 'http://localhost:5000';

const API = {
    getPokemon: function () {
        return axios.get(`${server}/api/pokemon`);
    },
    createPokemon: function (pokemon) {
        return axios.post(`${server}/api/pokemon`, pokemon);
    }
}

export default API;
