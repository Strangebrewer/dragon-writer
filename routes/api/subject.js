const router = require('express').Router();
const subjectController = require('../../controllers/subjectController');

router.route('/')
  .get(subjectController.getSubjects)
  .post(subjectController.createSubject);

router.route('/:id')
  .get(subjectController.getSingleSubject);

// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated())
//     return next();
//   res.json({ isAuthenticated: false });
// }

module.exports = router;