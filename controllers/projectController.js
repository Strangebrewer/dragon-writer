const db = require('../models');

module.exports = {

  getProjectsWithAll: function (req, res) {
    // db.Project.find({ userId: req.user._id })
    db.Project.find({ userId: "5c09994f0ec298003e671add" })
      .populate('subjects')
      .populate('texts')
      .then(response => res.json(response))
      .catch(err => res.status(422).json(err));
  },

  getSingleProject: function (req, res) {
    db.Project.findById(req.params.id)
      .then(response => res.json(response))
      .catch(err => res.status(422).json(err));
  },

  getSingleProjectWithAll: function (req, res) {
    db.Project.findById(req.params.id)
      .populate('subjects')
      .populate('texts')
      .then(response => res.json(response))
      .catch(err => res.status(422).json(err));
  },

  createProject: async function (req, res) {
    let lowerCaseLink = req.body.link.toLowerCase();
    const link = /^[a-z]+$/.test(lowerCaseLink);
    console.log(link);
    if (!link) return res.json({ customMessage: "Project keywords must be alpha characters only." });
    const projects = await db.Project.find({ userId: req.user._id });
    if (projects.length > 19) {
      return res.json({ customMessage: "You already have the maximum number of projects." });
    } else {
      try {
        req.body.userId = req.user._id;
        req.body.link = lowerCaseLink;
        const project = await db.Project.create(req.body);
        await db.User.findByIdAndUpdate(req.user._id,
          { $push: { projects: project._id } },
          { new: true }
        )
        res.json(project);
      }
      catch (err) {
        res.status(422).json(err);
      }
    }

  },

  updateProject: async function (req, res) {
    try {
      const project = await db.Project
        .findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(project);
    } catch (err) {
      res.send(err);
    }
  },

  deleteProject: async function (req, res) {
    try {
      await db.Text.deleteMany({ projectId: req.params.id });
      await db.Subject.deleteMany({ projectId: req.params.id });
      await db.Project.findByIdAndDelete(req.params.id);
      await db.User.findByIdAndUpdate(req.user._id,
        { $pull: { projects: req.params.id } },
        { new: true }
      )
      res.status(200).json({ message: "Delete complete." });
    }
    catch (err) {
      res.send(err);
    }
  }

}