const functions = require('firebase-functions');

const app = require('express')();

const FBAuth = require('./util/fbAuth')

const { getAllPins, postOnePin } = require('./handlers/pins');
const { signup, login, uploadImage } = require('./handlers/users');

// Pin routes
app.get('/pins', getAllPins);
app.post('/pin', FBAuth, postOnePin);

// Users routs
app.post('/signup', signup);
app.post(`/login`, login);
app.post('/user/image', FBAuth, uploadImage);

exports.api = functions.https.onRequest(app);
