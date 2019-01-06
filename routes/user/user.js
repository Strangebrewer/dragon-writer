const router = require('express').Router();
const passport = require('../../passport');
const userController = require('../../controllers/userController');

router
  .route('/')
  .get(userController.getUser)
  .post(userController.signup);

router
  .route('/data')
  .put(isLoggedIn, userController.updateUserInfo);

router.put('/order', isLoggedIn, userController.updateUserOrder);

router.get('/projects', userController.getUserWithProjects);

router.post('/login', passport.authenticate('local'), userController.login);

router.post('/logout', userController.logout);

router.post('/change', isLoggedIn, userController.changePw);



function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.json({ isAuthenticated: false });
}

module.exports = router;