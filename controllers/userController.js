const db = require('../models');
const { sign } = require('../passport');
const user_model = new db.User(db.UserModel, sign);

module.exports = {
  fetchPublicWorks: async function (req, res) {
    try {
      const user = await user_model.getPublicWorks(req.params)
      res.json(user);
    } catch (e) {
      console.loud(e);
    }
  },

  getCurrentUser: function (req, res) {
    const { _id, order, projects, url, username } = req.user;
    const userData = { _id, order, projects, url, username };
    res.json({ msg: "logged in", user: userData });
  },

  getUserWithProjects: async function (req, res) {
    try {
      if (req.user) {
        const user = await user_model.findWithProjects(req.user.id, 'projects');
        res.json(user);
      }
    } catch (err) {
      res.json({ user: null })
    }
  },

  signup: async function (req, res) {
    try {
      const user = await user_model.createNewUser(req.body);
      res.json(user)
    } catch (err) {
      res.json({ msg: err.message });
    }
  },

  updateUserOrder: async function (req, res) {
    try {
      const user = await db.UserModel.findByIdAndUpdate(req.user._id, req.body, { new: true })
      res.json(user);
    }
    catch (err) {
      res.status(422).json(err);
    }
  },

  updateUserInfo: async function (req, res) {
    try {
      const user = await user_model.updateUser(req.body, req.user);
      res.json(user);
    } catch (err) {
      res.json({ msg: err.message });
    }
  },

  login: async function (req, res) {
    try {
      const user = await user_model.login(req.body);
      res.json(user);
    } catch (err) {
      res.json({ message: err.message });
    }
  },

  changePw: function (req, res) {
    try {
      const user = user_model.updatePassword(req.body, req.user)
      res.json(user);
    } catch (err) {
      res.json({ message: err.message });
    }
  },

}
