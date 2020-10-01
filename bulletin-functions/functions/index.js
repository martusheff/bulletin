const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const express = require('express');
const app = express();

app.get('/pins', (req, res) => {
    admin
        .firestore()
        .collection('pins')
        .get()
        .then(data => {
            let pins = [];
            data.forEach(doc => {
                pins.push(doc.data());
            });
            return res.json(pins);
            })
            .catch(err => console.error(err));
});




app.post('/pin', (req, res) => {
    const newPin = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: admin.firestore.Timestamp.fromDate(new Date())
    };

    admin
        .firestore()
        .collection('pins')
        .add(newPin)
        .then(doc => {
            res.json({ message: `document ${doc.id} created successfully`})
        })
        .catch(err => {
            res.status(500).json({ error: `something went wrong`})
            console.error(err);
        })
});

// https://baseurl.com/api/screams

exports.api = functions.https.onRequest(app);
