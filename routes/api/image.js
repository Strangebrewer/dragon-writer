const router = require('express').Router();
const { passport } = require('../../passport');
const imageController = require('../../controllers/imageController');

router.route('/upload')
  .post(passport.authenticate('jwt', { session: false }), imageController.saveImage);

router.route('/all')
  .get(passport.authenticate('jwt', { session: false }), imageController.getImages)

router.route('/:id')
  .put(passport.authenticate('jwt', { session: false }), imageController.removeImage);

module.exports = router;