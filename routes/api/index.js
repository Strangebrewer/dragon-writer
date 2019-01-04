const router = require('express').Router();
const textRoutes = require('./text');
const projectRoutes = require('./project');
const subjectRoutes = require('./subject');
const imageRoutes = require('./image');

// api routes
router.use('/text', textRoutes);
router.use('/project', projectRoutes);
router.use('/subject', subjectRoutes);
router.use('/image', imageRoutes);

module.exports = router;