const router = require('express').Router();
const textController = require('../../controllers/textController');

router.route('/')
  .get(textController.getTexts)
  .post(textController.createText);

router.route('/:id')
  .put(textController.updateText)
  .delete(textController.deleteText);

  router.route('/subject/:id')
    .put(textController.updateTextSubject);

// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated())
//     return next();
//   res.json({ isAuthenticated: false });
// }

module.exports = router;