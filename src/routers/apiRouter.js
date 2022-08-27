const express = require('express');
const router = express.Router();
const positionsRouter = require('./positionsRouter');
const applicantsRouter = require('./applicantsRouter');


router.use('/positions', positionsRouter);
router.use('/applicants', applicantsRouter);

module.exports = router;
