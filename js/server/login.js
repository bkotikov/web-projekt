const db = require('./db.js');

function  signIn(params) {
    return new Promise ((resolve, reject) => {
        db.getUserByEmail(params).then(res => {
            resolve(res);
        }).catch(error => {
            reject(error);
        });
    });
}

module.exports = {
    signIn,
}