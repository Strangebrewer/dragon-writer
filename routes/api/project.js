const router = require('express').Router();
const projectController = require('../../controllers/projectController');
const imageController = require('../../controllers/imageController');

router.route('/')
  .get(projectController.getProjectsWithAll)
  .post(projectController.createProject);

router.route('/image/:id')
  .put(imageController.removeProjectImage);

router.route('/:id')
  .get(projectController.getSingleProject)
  .put(projectController.updateProject)
  .delete(projectController.deleteProject);

// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated())
//     return next();
//   res.json({ isAuthenticated: false });
// }

module.exports = router;