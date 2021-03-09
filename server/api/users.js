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
                console.log(newUser.id);
                return res.status(201).json({user:newUser});
            })
        });
    }
    
});

auth.post("/login", async (req,res) => {

    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const snapshot = await Users.where("username", '==', req.body.username).get();
    const user = snapshot.docs.map(doc => doc.data())[0]; 
    const user_id = snapshot.docs.map(doc => doc.id)[0];
    if(user.empty){
        return res.status(404).json({error:"email not found"});
    }
    bcrypt.compare(req.body.password, user.password).then(isMatch => {
        if (isMatch) { 
            const payload = {
                id: user_id,
                name: user.username
            };
        
            jwt.sign(
                payload,
                config.secretOrKey,
                {
                    expiresIn: 31556926
                },
                (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    });
                }
            );

        } else {
            return res.status(400).json({error:"password incorrect"})
        }
    })
})

module.exports = auth;