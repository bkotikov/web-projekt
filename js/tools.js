const crypto = require('crypto');

function createPasswordHash(value) {
    console.log(crypto.createHash('sha256').update(value).digest('hex'));
    return crypto.createHash('sha256').update(value).digest('hex');
}

function getCookie(params) {
    
}

function setCookie(params) {
    
}

module.exports = {
    createPasswordHash
}