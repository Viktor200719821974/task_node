const fs = require("fs");

const getArrayId = (array, id) => {
    return new Promise((resolve, reject) => {
        const row = array.find(r => r.id === id);
        if (!row) {
            reject({
                message: 'Not found',
                status: 404
            });
        }
        resolve(row);
    });
}
const createNewId = (array) => {
    if (array.length > 0) {
        return array.length  + 1
    } else {
        return 1
    }
}
const createArray = (content, filepath) => {
    fs.writeFileSync(filepath, JSON.stringify(content), (err) => {
        if(err){
            console.log(err);
        }
    });
}
const filterCreatePosition = (applicants, position) => {
    const level = applicants.filter(c => c.level === position.level);
    const categories = level.filter(c => (c.categories).find(b => b === position.category));
    let japaneseRequired;
    if (position.japaneseRequired) {
        japaneseRequired = categories.filter(c => c.japaneseKnowledge === position.japaneseRequired);
    } else {
         japaneseRequired = categories;
    }
    return japaneseRequired.map(c => c.email);
}
const filterCreateApplicants = (positions, applicant) => {
    const level = positions.filter(c => c.level === applicant.level);
    const category = level.filter((c) =>  applicant.categories.find((b) => c.category === b));
    let japaneseKnowledge;
    if (!applicant.japaneseKnowledge) {
        japaneseKnowledge = category.filter(c => c.japaneseRequired === applicant.japaneseKnowledge);
    } else {
        japaneseKnowledge = category;
    }
    return japaneseKnowledge;
}

module.exports = {
    getArrayId,
    createNewId,
    createArray,
    filterCreatePosition,
    filterCreateApplicants
}