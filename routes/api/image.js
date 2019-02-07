const router = require('express').Router();
const { passport } = require('../../passport');
const imageController = require('../../controllers/imageController');

router.route('/:id')
  .put(passport.authenticate('jwt', { session: false }), imageController.removeImage);

module.exports = router;