const db = require('../models');

module.exports = {

  getSubjects: async function (req, res) {
    try {
      const subjects = await db.Subject.find({ userId: req.user._id })
        .populate('texts');
      res.json(subjects);
    } catch (err) {
      res.send(err)
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
      res.send(err);
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
      res.send(err);
    }
  },

  updateSubject: async function (req, res) {
    try {
      if (req.body.hasOwnProperty("published")) {
        let update;
        if (req.body.published) update = { $push: { published: req.params.id } };
        else update = { $pull: { published: req.params.id } };
        await db.Project.findOneAndUpdate({ _id: req.body.projectId }, update, { new: true });
        delete req.body.projectId;
      }
      const subject = await db.Subject.findByIdAndUpdate(
        req.params.id, req.body, { new: true }
      );
      res.json(subject);
    }
    catch (err) {
      res.send(err);
    }
  },

  deleteSubject: async function (req, res) {
    try {
      const promiseArray = []
      const subject = await db.Subject.findByIdAndDelete(req.params.id);
      for (let i = 0; i < subject.texts.length; i++) {
        const element = subject.texts[i];
        promiseArray.push(db.Text.findByIdAndDelete(element));
      }
      await Promise.all(promiseArray);
      res.status(200).json({ message: "Delete complete." })
    }
    catch (err) {
      res.send(err);
    }
  },

}