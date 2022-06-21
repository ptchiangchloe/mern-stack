function isEmpty(str) {
    return (!str || str.length === 0 );
}

function createRandomID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};

function sum(a, b) {
    return a + b;
}

export { isEmpty, createRandomID, sum }