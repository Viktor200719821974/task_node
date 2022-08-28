const repository = require('../repositories')

const getArrays = (array, category, level, tag) => {
    return new Promise((resolve, reject) => {
        let filter;
        if (category && level && tag) {
            filter = array.filter(
                c => c.category === category
                    && c.level === level
                    && (c.description).includes(tag));
        }
        if (!category && !level && tag) {
            filter = array.filter(c => (c.description).includes(tag));
        }
        if (category && !level && !tag) {
            filter = array.filter(c => c.category === category);
        }
        if (!category && level && !tag) {
            filter = array.filter(c => c.level === level);
        }
        if (category && level && !tag) {
            filter = array.filter(c => c.category === category && c.level === level);
        }
        if (category && !level && tag) {
            filter = array.filter(c => c.category === category && (c.description).includes(tag));
        }
        if (!category && level && tag) {
            filter = array.filter(c => c.level === level && (c.description).includes(tag));
        }
        if (!category && !level && !tag) {
            filter = array;
        }
        if (array.length === 0) {
            reject({
                message: 'no posts available',
                status: 202
            });
        }
        resolve(filter);
    });
}
const getArrayId = (id, array) => {
    return new Promise((resolve, reject) => {
        repository.getArrayId(array, id)
            .then(position => resolve(position))
            .catch(err => reject(err));
    });
}
const createArray = (newPosition, array, filepath) => {
    return new Promise((resolve, reject) => {
        const id = { id: repository.createNewId(array) }
        newPosition = { ...id, ...newPosition };
        array.push(newPosition);
        repository.createArray(array, filepath);
        resolve(newPosition);
    });
}
const putArray = (id, object, array, filepath) => {
    return new Promise((resolve, reject) => {
        repository.getArrayId(array, id)
            .then(c => {
                const index = array.findIndex(p => p.id === c.id)
                id = { id: c.id }
                array[index] = { ...id, ...object }
                repository.createArray(array, filepath);
                resolve(array[index])
            })
            .catch(err => reject(err))
    });
}
const patchArray = (id, japaneseRequired, array, filepath) => {
    return new Promise((resolve, reject) => {
         repository.getArrayId(array, id)
            .then(c => {
                const index = array.findIndex(p => p.id === c.id);
                console.log(c);
                c.japaneseRequired = japaneseRequired;
                // array[index].map(c => ) = object;
                repository.createArray(array, filepath);
                resolve(array[index]);
            })
            .catch(err => reject(err));
    });
}
const deleteArray = (id, array, filepath) => {
    return new Promise((resolve, reject) => {
        repository.getArrayId(array, id)
            .then((oldArray) => {
                const newPositions = array.filter(p => p.id !== id);
                repository.createArray(newPositions, filepath);
                resolve(oldArray);
            })
            .catch(err => reject(err))
    });
}

module.exports = {
    getArrays,
    getArrayId,
    createArray,
    putArray,
    patchArray,
    deleteArray
}