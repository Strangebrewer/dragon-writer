const router = require('express').Router();
const { passport } = require('../../passport');
const projectController = require('../../controllers/projectController');

router.route('/')
  .get(projectController.getProjectsWithAll)
  .post(passport.authenticate('jwt', { session: false }), projectController.createProject);

router.route('/all/:id')
  .get(passport.authenticate('jwt', { session: false }), projectController.getSingleProjectWithAll);

router.route('/:id')
  .get(passport.authenticate('jwt', { session: false }), projectController.getSingleProject)
  .put(passport.authenticate('jwt', { session: false }), projectController.updateProject)
  .delete(passport.authenticate('jwt', { session: false }), projectController.deleteProject);

module.exports = router;