const router = require('express').Router();
const imageController = require('../../controllers/imageController');

router.route('/:id')
  .put(isLoggedIn, imageController.removeImage);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.json({ isAuthenticated: false });
}

module.exports = router;