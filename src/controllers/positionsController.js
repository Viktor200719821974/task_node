const positionsService = require('../services');
const filepath = './src/db/positions.json';
const positions = require('../db/positions.json');
const applicants = require('../db/applicants.json');
const repository = require('../repositories/index');

const getPositions = async (req, res) => {
    const {category, level, tag} = req.query;
    await positionsService.getArrays(positions, category, level, tag).then(positions => res.json(positions)).catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    });
}
const getPositionId = async (req, res) => {
    const id = req.params.id;
    await positionsService.getArrayId(+id, positions)
        .then(position => res.json(position))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message });
            } else {
                res.status(500).json({ message: err.message });
            }
        });
}
const postPosition = async (req, res) => {
    await positionsService.createArray(req.body, positions, filepath)
        .then(position => {
            res.status(201).json({
                message: `The position #${position.id} has been created`,
                content: position
        });
            const email = repository.filterCreatePosition(applicants, position);
        })
        .catch(err => res.status(500).json({ message: err.message }));
}
const patchPosition = async (req, res) => {
    const id = req.params.id;
    const { japaneseRequired } = req.body;
    await positionsService.patchArray(+id, japaneseRequired, positions, filepath)
        .then(position => res.status(200).json({
            message: `The position #${id} has been updated`,
            content: position
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message });
            }
            res.status(500).json({ message: err.message });
        });
}
const deletePosition = async (req, res) => {
    const id = req.params.id;
    await positionsService.deleteArray(+id, positions, filepath)
        .then((position) => {
            res.status(204).json({
                message: `The position #${id} has been deleted`,
            });
            const email = repository.filterCreatePosition(applicants, position);
        })
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message });
            }
            res.status(500).json({ message: err.message });
        });
}

module.exports = {
    getPositions,
    getPositionId,
    postPosition,
    patchPosition,
    deletePosition
};
