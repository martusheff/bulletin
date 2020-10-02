const { db } = require('../util/admin')

exports.getAllPins = (req, res) => {
    db
        .collection('pins')
        .orderBy('createdAt','desc')
        .get()
        .then(data => {
            let pins = [];
            data.forEach(doc => {
                pins.push({
                    pinId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt
                });
            });
            return res.json(pins);
            })
            .catch(err => console.error(err));
}

exports.postOnePin = (req, res) => {
    const newPin = {
        body: req.body.body,
        userHandle: req.user.handle,
        createdAt: new Date().toISOString()
    };

    db
        .collection('pins')
        .add(newPin)
        .then(doc => {
            res.json({ message: `document ${doc.id} created successfully`})
        })
        .catch(err => {
            res.status(500).json({ error: `something went wrong`})
            console.error(err);
        })
};

