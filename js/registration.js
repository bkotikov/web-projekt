const db = require('./db.js');

function  signUp(params) {
    return new Promise ((resolve, reject) => {
        db.insertUser(params).then(res => {
            console.log("id: " + res);
            resolve(res);
        });
    });
}

module.exports = {
    signUp,
}