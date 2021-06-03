const crypto = require('crypto');

function createPasswordHash(value) {
    return crypto.createHash('sha256').update(value).digest('hex');
}

function getCookie(params) {
    
}

function setCookie(params) {
    
}

module.exports = {
    createPasswordHash
}