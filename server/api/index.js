const express = require('express');
const config = require('../config');
const Pokemon = require('../models/pokemon');
const fs = require('firebase-admin');

const serviceAccount = require(config.firestoreKeyPath);

fs.initializeApp({
 credential: fs.credential.cert(serviceAccount)
});

const db = fs.firestore();

const router = express.Router();
const pokemons = db.collection('pokemons'); 

router.get('/pokemon', async (req, res) => {
    
    let snapshot = await pokemons.get();
    let pokemon = snapshot.docs.map(doc => doc.data()); 
    res.status(200).json({ pokemon });
});

router.post('/pokemon', async (req, res) => {
    const { pokemon } = req.body;
    const { name, description, type1, type2, image, moves } = pokemon
    if ((!name || !description || !type1 || !image || !moves) || moves.length > 4) {
        res.status(400).json({ error: 'Invalid input' });
    } else {
        console.log(JSON.parse(JSON.stringify(pokemon)));
        const newPokemon = await pokemons.add(JSON.parse(JSON.stringify(pokemon)));
        res.status(200).json({ pokemon: newPokemon });
    }
});

module.exports = router;
