const db = require('../models');
const removeImage = require('./imageController').removeImage;

function CustomError(error) {
  console.log(error);
}

module.exports = {

  getTexts: function (req, res) {
    db.Text.find({ userId: req.user._id })
      .then(response => res.json(response))
      .catch(err => res.send(err));
  },

  //  add functionality to front end to notify a user if a text has become errant and needs to be updated.
  createText: async function (req, res) {
    req.body.userId = req.user._id;
    try {
      const text = await db.Text.create(req.body)
        .catch(err => {
          throw new Error({ location: "text", error: err });
        });
      await db.Project.findOneAndUpdate(
        { _id: text.projectId },
        { $push: { texts: text._id } }
      ).catch(err => {
        throw new Error({ location: "project", error: err });
      })
      await db.Subject.findOneAndUpdate(
        { _id: text.subjectId },
        { $push: { texts: text._id } }
      ).catch(err => {
        throw new Error({ location: "subject", error: err });
      });
      const validText = await db.Text.findByIdAndUpdate(text._id,
        { errant: false },
        { new: true }
      ).catch(err => {
        throw new Error({ location: "errant", error: err });
      });
      res.json(validText);
    }
    catch (err) {
      res.status(422).json(err);
    }
  },

  updateText: async function (req, res) {
    try {
      const text = db.Text.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
      if (req.body.imageId) {
        db.Image.findByIdAndUpdate({ _id: req.body.imageId },
          { $push: { texts: text._id } },
          { new: true }
        );
      }
      res.json(text);
    } catch (err) {
      res.json(err)
    }
    // db.Text.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    //   .then(text => res.json(text))
    //   .catch(err => res.status(422).json(err));
  },

  updateTextSubject: async function (req, res) {
    try {
      const text = await db.Text.findByIdAndUpdate(
        req.params.id,
        {
          subjectId: req.body.destinationId,
          errant: true
        }
      ).catch(err => {
        throw new Error({ location: "text", error: err });
      });
      await db.Subject.findByIdAndUpdate(
        req.body.sourceId,
        { $pull: { texts: req.params.id } }
      ).catch(err => {
        throw new Error({ location: "pull", error: err });
      });
      await db.Subject.findByIdAndUpdate(
        req.body.destinationId,
        { $push: { texts: req.params.id } }
      ).catch(err => {
        throw new Error({ location: "push", error: err });
      });
      const validText = await db.Text.findByIdAndUpdate(
        req.params.id,
        { errant: false },
        { new: true }
      ).catch(err => {
        throw new Error({ location: "errant", error: err });
      });
      res.json(validText);
    }
    catch (err) {
      res.status(422).json(err);
    }
  },

  deleteText: async function (req, res) {
    removeImage();
    try {
      const text = await db.Text.findByIdAndDelete(req.params.id);
      await db.Project.findOneAndUpdate(
        { _id: text.projectId },
        { $pull: { texts: text._id } }
      );
      await db.Subject.findOneAndUpdate(
        { _id: text.subjectId },
        { $pull: { texts: text._id } }
      );
      res.json(text)
    } catch (err) {
      res.status(422).json(err)
    }
  },

}