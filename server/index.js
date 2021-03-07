const express = require('express');
const config = require('./config');
const cors = require('cors');
const router = require('./api');
const auth = require('./api/users');
const server = express();
const mongoose = require('mongoose');
const passport = require('passport');

const users = require("./api/users");

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

mongoose.connect(config.databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true }).then(() => {
console.log('Connected to MongoDB database');
});


server.use('/api', router);
server.use('/api/users', auth);


server.use(passport.initialize());

require("./config/passport")(passport);

server.listen(config.PORT, () => {
    console.log('Server started on port ' + config.PORT);
});

