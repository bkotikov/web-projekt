const db = require('./db.js');

function  signUp(params) {
    return new Promise ((resolve, reject) => {
        db.insertUser(params).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
}

module.exports = {
    signUp,
}