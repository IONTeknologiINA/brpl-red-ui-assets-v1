const lengthMasker = {
    mask: ['H cm', 'HH cm', 'HHH cm', 'HHHH cm', 'HHHHH cm', 'HHHHHH cm', 'HHHHHHH cm'],
    tokens: {
        'H': {
            pattern: /^\d*\.?\d*$/
        }
    }
};

const weightMasker = {
    mask: ['H gr!am', 'HH gr!am', 'HHH gr!am', 'HHHH gr!am', 'HHHHH gr!am', 'HHHHHH gr!am', 'HHHHHHH gr!am'],
    tokens: {
        'H': {
            pattern: /^\d*\.?\d*$/,
        }
    }
};

function normalizeNumber(str) {
    return +str.replace(/[^\d.-]/g, '');
}

module.exports = {
    normalizeNumber,
    lengthMasker,
    weightMasker
}
