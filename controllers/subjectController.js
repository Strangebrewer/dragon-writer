const db = require('../models');

module.exports = {

  getSubjects: async function (req, res) {
    try {
      const subjects = await db.Subject.find({ userId: req.user._id })
        .populate('texts');
      res.json(subjects);
    } catch (err) {
      res.status(422).json(err)
    }
  },

  getSingleSubject: async function (req, res) {
    try {
      const subject = await db.Subject.findById(req.params.id)
        .populate('texts')
        .catch(err => {
          throw new Error({ message: "Could not find that subject in the database." });
        });
      res.json(subject);
    }
    catch (err) {
      res.json(err);
    }
  },

  createSubject: async function (req, res) {
    req.body.userId = req.user._id;
    try {
      const subject = await db.Subject.create(req.body);
      await db.Project.findOneAndUpdate(
        { _id: req.body.projectId },
        { $push: { subjects: subject._id } },
        { new: true }
      );
      res.json(subject)
    } catch (err) {
      res.status(422).json(err);
    }
  },

}