const router = require('express').Router();
const subjectController = require('../../controllers/subjectController');

router.route('/')
  .get(isLoggedIn, subjectController.getSubjects)
  .post(isLoggedIn, subjectController.createSubject);

router.route('/:id')
  .get(isLoggedIn, subjectController.getSingleSubject)
  .put(isLoggedIn, subjectController.updateSubject)
  .delete(isLoggedIn, subjectController.deleteSubject);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.json({ isAuthenticated: false });
}

module.exports = router;