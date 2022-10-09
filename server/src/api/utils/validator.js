function isEmpty(data) {
    if (data === null) return false;
    return data.length !== 0;
}

const validator = (data,keyWord) => {
    switch (keyWord) {
        case 'isEmpty':
            return isEmpty(data);

        default:
            return null;
    }
};

module.exports = validator;
