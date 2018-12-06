const db = require('../models');
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'dm6eoegii',
  api_key: '994121466374137',
  api_secret: 'AIW7uhSv-iKQUhTFkYSP1pueSqE'
});

module.exports = {

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
        }, { new: true });
        console.log(removal);
      }
      res.json(removal);
    }
    catch (err) {
      res.status(422).json(err);
    }
  },

  removeSubjectImage: async function (req, res) {
    let removal;
    try {
      const result = await cloudinary.v2.uploader.destroy(req.body.imageId, { invalidate: true });
      console.log(result.result);
      if (result.result === 'ok') {
        removal = await db.Subject.findByIdAndUpdate(req.params.id, {
          image: '',
          largeImage: '',
          publicId: ''
        }, { new: true });
        console.log(removal);
      }
      res.json(removal);
    }
    catch (err) {
      res.send(err);
    }
  },

  removeTextImage: async function (req, res) {
    let removal;
    try {
      const result = await cloudinary.v2.uploader.destroy(req.body.imageId, { invalidate: true });
      console.log(result.result);
      if (result.result === 'ok') {
        removal = await db.Text.findByIdAndUpdate(req.params.id, {
          image: '',
          largeImage: '',
          publicId: ''
        }, { new: true });
        console.log(removal);
      }
      res.json(removal);
    }
    catch (err) {
      res.send(err);
    }
  }
}