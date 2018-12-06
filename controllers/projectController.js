const db = require('../models');
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'dm6eoegii',
  api_key: '994121466374137',
  api_secret: 'AIW7uhSv-iKQUhTFkYSP1pueSqE'
});

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
      const user = await db.User.findByIdAndUpdate(req.user._id,
        { $push: { projects: project._id } },
        { new: true }
      )
      res.json(user);
    } catch (err) { res.status(422).json(err) }
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
      res.status(200).json({ message: "Delete complete." });
    }
    catch (err) {
      res.send(err);
    }
  },

  removeProjectImage: async function (req, res) {
    let removal;
    try {
      const result = await cloudinary.v2.uploader.destroy(req.body.imageId, { invalidate: true });
      console.log(result.result);
      if (result.result === 'ok') {
        removal = await db.Project.findByIdAndUpdate(req.params.id, {
          image: '',
          largeImage: '',
          publicId: ''
        });
        console.log(removal);
      }
      res.json(result);
    }
    catch (err) {
      res.send(err);
    }

  }

}