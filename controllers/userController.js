const db = require('../models');
const bcrypt = require('bcryptjs');

module.exports = {
  getUser: function (req, res) {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
      db.User.findOne({ _id: req.user._id })
        .then(response => {
          res.json(response);
        });
    } else {
      res.json({ user: null })
    }
  },

  signup: function (req, res) {
    const { username, email } = req.body;
    let emailTest = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email);
    let userTest = /^[a-zA-Z0-9]+$/.test(username);

    if (!emailTest || !userTest) {
      console.log(emailTest);
      console.log(userTest);
      return res.json({ error: 'did not validate' });
    }

    // ADD VALIDATION
    db.User.findOne({ username: username }, (err, user) => {
      if (err) {
        res.send('User.js post error: ', err);
      } else if (user) {
        res.json({ error: 'username taken' });
      } else {
        db.User.findOne({ email: email }, (err, nextUser) => {
          if (err) {
            res.send('User.js post error: ', err);
          } else if (nextUser) {
            res.json({ error: 'email taken' });
          }
          else {
            const pw = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null);
            req.body.password = pw;
            const newUser = new db.User(req.body)
            newUser.save((err, savedUser) => {
              if (err) return res.json(err)
              res.json(savedUser)
            });
          }
        });
      }
    });
  },

  updateUserInfo: function (req, res) {
    const { username, email } = req.body;

    let emailTest;
    email !== undefined ? emailTest = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email) : emailTest = true;

    let userTest;
    username !== undefined ? userTest = /^[a-zA-Z0-9]+$/.test(username) : userTest = true;

    if (!emailTest || !userTest) {
      return res.json({ error: 'did not validate' });
    }

    // ADD VALIDATION
    db.User.findOne({ username: username }, (err, user) => {
      if (err) {
        console.log('User.js post error: ', err)
      } else if (user) {
        res.json({ error: 'username taken' });
      } else {
        db.User.findOne({ email: email }, (err, nextUser) => {
          if (err) {
            console.log('User.js post error: ', err)
          } else if (nextUser) {
            res.json({ error: 'email taken' })
          }
          else {
            db.User.findOneAndUpdate({ _id: req.user._id }, req.body)
              .then(response => res.json(response))
              .catch(err => res.json(err));
          }
        })
      }
    })
  },

  login: async function (req, res) {
    const { username } = req.body;
    const user = await db.User.findOne({ username });
    if (!user)
      res.send("Error: Login failed.");
    else {
      const userObject = {};
      userObject.username = user.username;
      userObject.email = user.email;
      userObject._id = user._id;
      res.json(userObject)
    };
  },

  logout: function (req, res) {
    console.log("Hi! Here's your user: ");
    console.log(req.user);
    if (req.user) {
      req.session.destroy();
      res.send({ msg: 'logging out' })
    } else {
      res.send({ msg: 'no user to log out' })
    }
  },

  changePw: function (req, res) {
    console.log(req.body);
    const isMatch = bcrypt.compareSync(req.body.currentPassword, req.user.password);
    if (isMatch) {
      const pw = bcrypt.hashSync(req.body.newPassword, bcrypt.genSaltSync(10), null);
      db.User.findOneAndUpdate(
        { _id: req.user._id },
        { password: pw }
      )
        .then(response => {
          console.log("Check pw response:");
          console.log(response);
          res.json(response);
        })
    } else {
      res.send({ message: "incorrect" })
    }
  },

}
