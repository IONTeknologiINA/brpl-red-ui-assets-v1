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


/**
 * Normalize given string from escaped character
 * @param str
 * @returns {number}
 */
function normalizeNumber(str) {
    return +str.replace(/[^\d.-]/g, '');
}

/**
 * Utilities to delay some process
 * @param ms
 * @returns {Promise<unknown>}
 */
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
    normalizeNumber,
    lengthMasker,
    weightMasker,
    delay
}
