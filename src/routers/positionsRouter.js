const express = require('express');
const router = express.Router();
const positionsController = require('../controllers/positionsController');
const middlewares = require('../middlewares/index');

router.get('/', positionsController.getPositions);
router.get('/:id', middlewares.idMustBeInteger, positionsController.getPositionId);
router.post('/', middlewares.checkFieldsPosition, positionsController.postPosition);
router.patch('/:id', positionsController.patchPosition);
router.delete('/:id', positionsController.deletePosition);

module.exports= router;