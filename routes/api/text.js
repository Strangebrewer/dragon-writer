const router = require('express').Router();
const textController = require('../../controllers/textController');

router.route('/')
  .get(isLoggedIn, textController.getTexts)
  .post(isLoggedIn, textController.createText);

router.route('/:id')
  .put(isLoggedIn, textController.updateText)
  .delete(isLoggedIn, textController.deleteText);

router.route('/subject/:id')
  .put(isLoggedIn, textController.updateTextSubject);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.json({ isAuthenticated: false });
}

module.exports = router;