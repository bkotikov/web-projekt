const crypto = require('crypto');

function createPasswordHash(value) {
    return crypto.createHash('sha256').update(value).digest('hex');
}

module.exports = {
    createPasswordHash
}