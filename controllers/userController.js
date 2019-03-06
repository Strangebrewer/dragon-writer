const db = require('../models');
const bcrypt = require('bcryptjs');
const { passport, sign } = require('../passport');

module.exports = {
  fetchPublicWorks: async function (req, res) {
    // get all texts that are public
    console.log(req.params.username);
    try {
      const user = await db.User.findOne({ "url": req.params.username.toLowerCase() })
        .populate({ path: 'projects', match: { "published.0": { "$exists": true } }, populate: { path: 'published', populate: { path: 'texts' } } })
        .exec((err, docs) => {
          // docs.push({ userOrder: user.order });
          res.json(docs);
        });

      // await db.Project.find({
      //   userId: user._id,
      //   "published.0": { "$exists": true }
      // }).populate({ path: 'published', populate: { path: 'texts' } })
      //   .exec((err, docs) => {
      //     docs.push({ userOrder: user.order });
      //     res.json(docs);
      //   });
    } catch (e) {
      console.log(e);
    }
  },

  getCurrentUser: function (req, res) {
    const { _id, order, projects, username } = req.user;
    const userData = {
      _id,
      order,
      projects,
      username
    }
    res.json({ msg: "logged in", user: userData });
  },

  getUserWithProjects: function (req, res) {
    if (req.user) {
      db.User.findOne({ _id: req.user._id })
        .populate('projects')
        .then(response => {
          const user = {
            projects: response.projects,
            _id: response._id,
            username: response.username,
            email: response.email,
            order: response.order,
            updatedAt: response.updatedAt,
          }
          res.json(user);
        });
    } else {
      res.json({ user: null })
    }
  },

  signup: async function (req, res) {
    const { username, email } = req.body;
    let emailTest = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email);
    let userTest = /^[a-zA-Z][a-zA-Z0-9]+$/.test(username);

    let error = {};
    if (!emailTest) error.email = "email invalid";
    if (!userTest) error.username = "username invalid";

    if (!emailTest || !userTest) {
      return res.json(error);
    }

    // ADD VALIDATION
    const user = await db.User.findOne({ username: username })
    if (user) res.json({ error: 'username taken' });
    else {
      const nextUser = await db.User.findOne({ email: email });
      if (nextUser) res.json({ error: 'email taken' });
      else {
        const password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null);
        req.body.password = password;
        try {
          req.body.url = username.toLowerCase();
          const user = await db.User.create(req.body);
          const { email, _id, order, projects } = user;
          const token = sign({
            id: user._id,
            username,
          });
          const userData = {
            _id,
            email,
            order,
            projects,
            username
          }
          res.json({ msg: "logged in", token, user: userData });
        } catch (e) {
          console.log(e);
          res.status(500).json({ msg: e.message });
        }
      }
    }
  },

  updateUserOrder: async function (req, res) {
    console.log(req.body);
    try {
      const user = await db.User.findByIdAndUpdate(req.user._id, req.body, { new: true })
      console.log(user);
      res.json(user);
    }
    catch (err) {
      res.status(422).json(err);
    }
  },

  updateUserInfo: async function (req, res) {
    const { username, email } = req.body;

    let emailTest;
    email !== undefined
      ? emailTest = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)
      : emailTest = true;

    let userTest;
    username !== undefined
      ? userTest = /^[a-zA-Z0-9]+$/.test(username)
      : userTest = true;

    if (!emailTest || !userTest)
      return res.json({ error: 'did not validate' });

    // ADD VALIDATION
    const user = await db.User.findOne({ username: username })
    if (user) res.json({ error: 'username taken' });
    else {
      const nextUser = await db.User.findOne({ email: email });
      if (nextUser) res.json({ error: 'email taken' });
      else {
        try {
          const user = await db.User.findOneAndUpdate({ _id: req.user._id }, req.body);
          const { email, _id, order, projects } = user;
          const userData = {
            _id,
            email,
            order,
            projects,
            username
          }
          res.json(userData);
        } catch (e) {
          console.log(e);
          res.json({ msg: e.message });
        }
      }
    }
  },

  login: async function (req, res) {
    try {
      const { username, password } = req.body;
      const user = await db.User.findOne({ username });
      const passwordValid = await bcrypt.compare(password, user.password);
      const { email, _id, order, projects } = user;
      if (passwordValid) {
        const token = sign({
          id: user._id,
          username,
        });
        const userData = {
          _id,
          email,
          order,
          projects,
          username
        }
        res.json({ msg: "logged in", token, user: userData });
      } else {
        throw Error('Invalid credentials');
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message });
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
