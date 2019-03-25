const db = require('../models');
const ctrl = require('./controllerUtils');
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});

module.exports = {
  getImages: async function (req, res) {
    ctrl.consoleLoudLog('THIS IS IN THE GET IMAGES FUNCTION! DONT TAZE ME BRO!', req.user);
    try {
      const user = await db.User.findById(req.user._id).populate('images');
      res.json(user);
    } catch (err) {
      res.json(err);
    }
  },

  getImage: async function (req, res) {
    const colors = {
      padding: "green",
      message: "grey"
    }
    ctrl.consoleLoudLog('THIS IS IN THE GET SINGLE IMAGE FUNCTION:', req.params, colors);
    try {
      const image = await db.Image.findById(req.params.id);
      console.log(image);
      res.json(image);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  },

  removeImage: async function (req, res) {
    ctrl.consoleLoudLog('THIS IS IN THE REMOVE IMAGE FUNCTION:', req.body, { padding: "red", message: "blue" });
    let removal;
    try {
      const result = await cloudinary.v2.uploader.destroy(req.body.publicId, { invalidate: true });
      console.log(result.result);
      if (result.result === 'ok' || result.result === "not found") {
        removal = await db[req.body.type].findByIdAndUpdate(req.params.id, {
          image: '',
          largeImage: '',
          midImage: '',
          thumbnail: '',
          publicId: ''
        }, { new: true });
        console.log(removal);
      }
      res.json(removal);
    }
    catch (err) {
      res.status(422).json(err);
    }
  },

  saveImage: async function (req, res) {
    ctrl.consoleLoudLog('THIS IS IN THE SAVE IMAGE FUNCTION:', req.body);
    req.body.userId = req.user._id;
    ctrl.consoleLoudLog('THIS IS IN THE SAVE IMAGE FUNCTION AFTER ADDING THE USERID:', req.body);

    try {
      const image = await db.Image.create(req.body);
      const user = await db.User.findByIdAndUpdate(req.user._id,
        { $push: { images: image._id } },
        { new: true }
      ).populate('images');
      console.log(user);
      res.json({ user, image });
    } catch (err) {
      res.json(err);
    }
  }
}