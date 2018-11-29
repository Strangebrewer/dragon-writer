const router = require('express').Router();
const projectController = require('../../controllers/projectController');

router.route('/')
  .get(projectController.getProjects)
  .post(projectController.createProject);

router.route('/:id')
  .put(projectController.updateProject)
  .delete(projectController.deleteProject);

// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated())
//     return next();
//   res.json({ isAuthenticated: false });
// }

module.exports = router;