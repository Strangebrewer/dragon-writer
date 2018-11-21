const db = require('../models');

module.exports = {

  getProjects: function (req, res) {
    db.Project.find({ userId: req.user._id })
      .populate('subjects')
      .populate('texts')
      .then(response => res.json(response))
      .catch(err => res.status(422).json(err));
  },

  // need to update this to add the project id to the user
  createProject: async function (req, res) {
    req.body.userId = req.user._id;
    try {
      const project = await db.Project.create(req.body)
      db.User.findByIdAndUpdate(req.user._id,
        { $push: { projects: project._id } }
      )
      res.json(project);
    } catch (err) { res.status(422).json(err) }
  },

  updateProject: async function (req, res) {
    try {
      const project = await db.Project
        .findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(project);
    } catch (err) {
      res.status(422).json(err);
    }


  }

}