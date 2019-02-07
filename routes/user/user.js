const router = require('express').Router();
const { passport } = require('../../passport');
const userController = require('../../controllers/userController');

router
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), userController.getCurrentUser)
  .put(passport.authenticate('jwt', { session: false }), userController.updateUserInfo)
  .post(userController.signup);

router.post('/login', userController.login);

router.put('/order', passport.authenticate('jwt', { session: false }), userController.updateUserOrder);

router.get('/projects',  passport.authenticate('jwt', { session: false }), userController.getUserWithProjects);

router.post('/change', passport.authenticate('jwt', { session: false }), userController.changePw);

module.exports = router;