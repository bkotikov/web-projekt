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
create Table benutzer (benutzer_id uuid PRIMARY KEY,vorname VARCHAR ( 50 ) NOT NULL, nachname VARCHAR (50) NOT NULL, password VARCHAR ( 255 ) NOT NULL,email VARCHAR ( 255 ) UNIQUE NOT NULL,created_on TIMESTAMP NOT NULL,last_login TIMESTAMP);
*/

function insertUser(values) {
    const { vorname, nachname, passwort, email } = values;
    console.log("Vorname: " + vorname + "Nachname: " + nachname + "passwort: " + passwort + "email: " + email);
    return new Promise((resolve, reject) => {
        pool.connect()
            .then(() => {
                
                const sql = 'INSERT INTO benutzer (benutzer_id, vorname, nachname, password, email, created_on, last_login) VALUES ($1, $2, $3, $4, $5, $6, $7)';
                const id = uuidv4();
                console.log(id);
                console.log(nowTimestamp());
                console.log(nowTimestamp());

                const values = [id, vorname, nachname, tools.createPasswordHash(passwort), email, nowTimestamp(), nowTimestamp()];
                pool
                    .query(sql, values)
                    .then(res => {
                        resolve(id);
                    })
                    .catch(err => {
                        console.log("registration/fehler");
                        reject(err);
                    });
            }).catch(err => {
                console.log("first error: " + err);
            });
    });
}

function getUserByEmail(params) {
    const { email, password } = params;
    console.log("email: " + email);
    console.log("passwort: " + password);
    const passwort = tools.createPasswordHash(password);
    return new Promise((resolve, reject) => {
        const sql = "SELECT benutzer_id, email, password FROM benutzer WHERE email = $1 AND password = $2";
        pool.connect().then(res => {
            pool.query(sql, [email, passwort])
            .then(result => {
                //const { benutzer_id, email, password} = result.rows[0];
                resolve(result.rows[0]);
                res.end();
            })
            .catch(err => {
                
                console.log(err);
                reject(err);
            });
        })
        .catch(err => {
            console.log(err);
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
