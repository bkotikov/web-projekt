const {
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');

const { Pool } = require('pg');
const pool = new Pool({
    user: 'web',
    host: 'localhost',
    database: 'web',
    password: 'web2021',
    port: 5432
})

const tools = require('./tools.js');

/*
Table benutzer;
benutzer_id serial PRIMARY KEY,
        vorname VARCHAR ( 50 ) NOT NULL, nachname VARCHAR (50) NOT NULL, 
        password VARCHAR ( 50 ) NOT NULL,
        email VARCHAR ( 255 ) UNIQUE NOT NULL,
        created_on TIMESTAMP NOT NULL,
        last_login TIMESTAMP);

*/

function insertUser(values) {
    const { vorname, nachname, passwort, email } = values;
    return new Promise((resolve, reject) => {
        console.log(vorname + " " + nachname + " " + tools.createPasswordHash(passwort) + " " + email);
        pool.connect().then(con => {
            const sql = 'INSERT INTO benutzer (benutzer_id, vorname, nachname, password, email, created_on, last_login) VALUES ($1, $2, $3, $4, $5, $6, $7)';
            const values = [uuidv4(), vorname, nachname, tools.createPasswordHash(passwort), email, nowTimestamp(), nowTimestamp()];
            console.log("test");
            pool
                .query(sql, values)
                .then(res => {
                    console.log(res);
                    resolve(getUserByEmail(email));
                    //getUserByEmail(email)
                })
                .catch(err => {
                    console.log("second line");
                    console.log(err);
                    reject(err)
                    pool.end()
                });
        })
            .catch(err => {
                console.log("first error: " + err);
            }

            );
    });
}

function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        pool.connect().then(con => {
            const sql = "SELECT * FROM benutzer WHERE email = ?";
            pool.query(sql, email)
                .then(res => {
                    console.log(res);
                    resolve(res);
                    pool.end();
                })
                .catch(err => {
                    console.log("second line");
                    console.log(err);
                    reject(err)
                    pool.end()
                });
        });
    });
}

function uniqueId() {
    return new Date().getUTCMilliseconds();
}

function nowTimestamp() {
    var moment = require('moment');
    var time = moment();
    var time_format = time.format('YYYY-MM-DD HH:mm:ss');
    console.log(time_format);

    return time_format;
}

module.exports = {
    insertUser,
    getUserByEmail
}
