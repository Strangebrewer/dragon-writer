const router = require('express').Router();
const { passport } = require('../../passport');
const textController = require('../../controllers/textController');

router.route('/')
  .get(passport.authenticate('jwt', { session: false }), textController.getTexts)
  .post(passport.authenticate('jwt', { session: false }), textController.createText);

router.route('/:id')
  .put(passport.authenticate('jwt', { session: false }), textController.updateText)
  .delete(passport.authenticate('jwt', { session: false }), textController.deleteText);

router.route('/subject/:id')
  .put(passport.authenticate('jwt', { session: false }), textController.updateTextSubject);

module.exports = router;