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


// get pin

exports.getPin = (req, res) => {
    let pinData = {};
    db.doc(`/pins/${req.params.pinId}`)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return res.status(404).json({ error: 'Pin not found' });
        }
        pinData = doc.data();
        pinData.pinId = doc.id;
        return db
          .collection('comments')
          .orderBy('createdAt','desc')
          .where('pinId', '==', req.params.pinId)
          .get();
      })
    .then((data) => {
        pinData.comments = [];
        data.forEach((doc) => {
            pinData.comments.push(doc.data());
        });
        return res.json(pinData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.code });
      });
  };

  // COmment on a comment
  exports.commentOnPin = (req, res) => {
      if(req.body.body.trim() === '') return res.status(400).json({error: 'Comment must not be empty'});

      const newComment = {
          body: req.body.body,
          createdAt: new Date().toISOString(),
          pinId: req.params.pinId,
          userHandle: req.user.handle,
          userImage: req.user.imageUrl
      }

      db.doc(`/pins/${req.params.pinId}`).get()
      .then(doc => {
          if(!doc.exists){
              return res.status(404).json({error: 'Pin not found'});
          }
          return db.collection('comments').add(newComment);
      })
      .then(() => {
          res.json(newComment);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({error: 'Something went wrong.'});
      })
  }