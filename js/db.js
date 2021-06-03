const {
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');

const pg = require('pg')
const pool = new pg.Pool({
    user: 'web',
    host: 'localhost',
    database: 'web',
    password: 'web2021',
    port: 5432,
    statement_timeout: 0,
    idle_in_transaction_session_timeout: 0
});

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
        pool.connect()
            .then(() => {
                const sql = 'INSERT INTO benutzer (benutzer_id, vorname, nachname, password, email, created_on, last_login) VALUES ($1, $2, $3, $4, $5, $6, $7)';
                const id = uuidv4();
                const values = [id, vorname, nachname, tools.createPasswordHash(passwort), email, nowTimestamp(), nowTimestamp()];
                pool
                    .query(sql, values)
                    .then(res => {
                        resolve(id);
                    })
                    .catch(err => {
                        console.log(err);
                        reject(err);
                    });
            }).catch(err => {
                console.log("first error: " + err);
            });
    });
}

function getUserByEmail(id) {
    console.log("getById: " + id);
    return new Promise((resolve, reject) => {
        const sql = "SELECT benutzer_id FROM benutzer WHERE benutzer_id = ?";
        pool.connect().then(res => {
            pool.query(sql, [id])
            .then(result => {
                console.log("res: " + result);
                console.log(result.rows[0]);
                resolve(result.rows[0]);
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
            resolve(res);
        })
        .catch(err => {
            reject(err);
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
    return time_format;
}

module.exports = {
    insertUser,
    getUserByEmail
}
