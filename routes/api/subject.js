const router = require('express').Router();
const { passport } = require('../../passport');
const subjectController = require('../../controllers/subjectController');

router.route('/')
  .get(passport.authenticate('jwt', { session: false }), subjectController.getSubjects)
  .post(passport.authenticate('jwt', { session: false }), subjectController.createSubject);

router.route('/:id')
  .get(passport.authenticate('jwt', { session: false }), subjectController.getSingleSubject)
  .put(passport.authenticate('jwt', { session: false }), subjectController.updateSubject)
  .delete(passport.authenticate('jwt', { session: false }), subjectController.deleteSubject);

module.exports = router;