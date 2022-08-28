const applicantsService = require('../services');
const filepath = './src/db/applicants.json';
const applicants = require('../db/applicants.json');
const positions = require('../db/positions.json');
const repository = require('../repositories/index');
const {emailService} = require('../services/emailService');

const postApplicant = async (req, res) => {
    await applicantsService.createArray(req.body, applicants, filepath)
        .then(applicant => {
            res.status(201).json({
                message: `The applicant #${applicant.id} has been created`,
                content: applicant
            });
            const array = repository.filterCreateApplicants(positions, applicant);
            const email = applicant.email;
            emailService(array, email, 'applicant');
        })
        .catch(err => res.status(500).json({ message: err.message }));
}
const putApplicant = async (req, res) => {
    const id = req.params.id;
    await applicantsService.putArray(+id, req.body, applicants, filepath)
        .then(applicant => res.status(200).json({
            message: `The applicant #${id} has been updated`,
            content: applicant
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message });
            }
            res.status(500).json({ message: err.message });
        });
}
const deleteApplicant = async (req, res) => {
    const id = req.params.id;
    await applicantsService.deleteArray(+id, applicants, filepath)
        .then(applicant => res.status(204).json({
            message: `The applicant #${id} has been deleted`,
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message });
            }
            res.status(500).json({ message: err.message });
        });
}

module.exports = {
    postApplicant,
    putApplicant,
    deleteApplicant
}