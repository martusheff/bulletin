const functions = require('firebase-functions');

const app = require('express')();

const FBAuth = require('./util/fbAuth')

const { getAllPins, postOnePin, getPin, commentOnPin } = require('./handlers/pins');

const { signup, login, uploadImage, addUserDetails, getAuthenticatedUser} = require('./handlers/users');

// Pin routes
app.get('/pins', getAllPins);
app.post('/pin', FBAuth, postOnePin);
app.get('/pin/:pinId', getPin);
//TODO: delete pin, like pin, unlike pin, comment on pin
app.post('/pin/:pinId/comment',FBAuth, commentOnPin)

// Users routs
app.post('/signup', signup);
app.post(`/login`, login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);




exports.api = functions.https.onRequest(app);
