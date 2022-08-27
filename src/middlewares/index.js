const idMustBeInteger = (req, res, next) => {
    const id = req.params.id
    if (!Number.isInteger(parseInt(id))) {
        res.status(400).json({ message: 'ID must be an integer' })
    } else {
        next()
    }
}
const checkFieldsPosition = (req, res, next) => {
    const { category, level, company } = req.body;
    if (category && level && company) {
        next();
    } else {
        res.status(400).json({ message: 'Fields are not good' });
    }
}
const checkFieldsApplicant = (req, res, next) => {
    const { email, categories, level } = req.body;
    if (categories && level && email) {
        next();
    } else {
        res.status(400).json({ message: 'Fields are not good' });
    }
}
module.exports= {
    idMustBeInteger,
    checkFieldsPosition,
    checkFieldsApplicant
}