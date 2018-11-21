const router = require('express').Router();
const textRoutes = require('./text');
const projectRoutes = require('./project');
const subjectRoutes = require('./subject');

// api routes
router.use('/text', textRoutes);
router.use('/project', projectRoutes);
router.use('/subject', subjectRoutes);

module.exports = router;