const router = require('express').Router();
const projectController = require('../../controllers/projectController');
const imageController = require('../../controllers/imageController');

router.route('/')
  .get(projectController.getProjects)
  .post(projectController.createProject);

router.route('/only')
  .get(projectController.getProjectsOnly);

router.route('/image/:id')
  .put(imageController.removeProjectImage);

router.route('/:id')
  .put(projectController.updateProject)
  .delete(projectController.deleteProject);

// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated())
//     return next();
//   res.json({ isAuthenticated: false });
// }

module.exports = router;