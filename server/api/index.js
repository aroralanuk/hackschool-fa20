const express = require("express");
const config = require("../config");
const fs = require("firebase-admin");
const passport = require("passport");

const serviceAccount = require(config.firestoreKeyPath);

fs.initializeApp({
  credential: fs.credential.cert(serviceAccount),
});

const db = fs.firestore();

const router = express.Router();
const pokemons = db.collection("pokemons");

router.get(
  "/pokemon",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let user = req.user.docs.map((doc) => doc.data())[0];
    let snapshot = await pokemons
      .where("created_by", "==", user.username)
      .get();
    let pokemon = snapshot.docs.map((doc) => doc.data());
    // console.log(snapshot);
    res.status(200).json({ pokemon });
  }
);

router.post(
  "/pokemon",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { pokemon } = req.body;
    const { name, description, type1, type2, image, moves } = pokemon;
    const power = moves.reduce((x, move) => x + parseInt(move.power), 0);
    if (
      !name ||
      !description ||
      !type1 ||
      !image ||
      !moves ||
      moves.length > 4 ||
      power > 100
    ) {
      res.status(400).json({ error: "Invalid input" });
    } else {
      let user = req.user.docs.map((doc) => doc.data())[0];
      let poke = { ...pokemon, created_by: user.username };
      //   console.log(JSON.parse(JSON.stringify(poke)));
      // const newPokemon = await pokemons.add(JSON.parse(JSON.stringify(poke)));
      // res.status(200).json({ pokemon: newPokemon });
      res.status(200).json({});
    }
  }
);

module.exports = router;
