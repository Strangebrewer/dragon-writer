const router = require('express').Router();
const projectController = require('../../controllers/projectController');

router.route('/')
  .get(isLoggedIn, projectController.getProjectsWithAll)
  .post(isLoggedIn, projectController.createProject);

router.route('/all/:id')
  .get(isLoggedIn, projectController.getSingleProjectWithAll);

router.route('/:id')
  .get(isLoggedIn, projectController.getSingleProject)
  .put(isLoggedIn, projectController.updateProject)
  .delete(isLoggedIn, projectController.deleteProject);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.json({ isAuthenticated: false });
}

module.exports = router;