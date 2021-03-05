const express = require('express');
const config = require('../config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('firebase-admin');

const validateRegisterInput = require('../auth/register');
const validateLoginInput = require('../auth/login');

const serviceAccount = require(config.firestoreKeyPath);

// fs.initializeApp({
//  credential: fs.credential.cert(serviceAccount)
// });

const db = fs.firestore();
const Users = db.collection('Users'); 

const auth = express.Router();

auth.post("/register", async (req,res) => {

    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    const snapshot = await Users.where("username", '==', req.body.username).get();
    if (!snapshot.empty){
        return res.status(400).json({username:"username already exists"});
    } else {
        bcrypt.genSalt(10, async (err, salt) => {
            bcrypt.hash(req.body.password,salt, async (err, hash) => {
                if (err) throw err;
                const newUser = await Users.add(
                    {
                        username: req.body.username,
                        password: hash
                    }
                );
                return res.status(201).json({user:newUser});
            })
        });
    }
    
});

module.exports = auth;