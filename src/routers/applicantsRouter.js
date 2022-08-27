const express = require('express');
const router = express.Router();
const applicantsController = require('../controllers/applicantsController');
const middleware = require('../middlewares/index')

router.post('/', middleware.checkFieldsApplicant, applicantsController.postApplicant);
router.put('/:id', middleware.idMustBeInteger, applicantsController.putApplicant);
router.delete('/:id', middleware.idMustBeInteger, applicantsController.deleteApplicant);

module.exports= router;