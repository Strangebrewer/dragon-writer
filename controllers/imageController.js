const db = require('../models');
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});

module.exports = {
  removeImage: async function (req, res) {
    console.log(req.body.type);
    let removal;
    try {
      const result = await cloudinary.v2.uploader.destroy(req.body.imageId, { invalidate: true });
      console.log(result.result);
      if (result.result === 'ok' || result.result === "not found") {
      removal = await db[req.body.type].findByIdAndUpdate(req.params.id, {
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
  }
}