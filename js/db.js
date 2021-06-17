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



/*
create Table benutzer (benutzer_id uuid PRIMARY KEY,vorname VARCHAR ( 50 ) NOT NULL, nachname VARCHAR (50) NOT NULL, password VARCHAR ( 255 ) NOT NULL,email VARCHAR ( 255 ) UNIQUE NOT NULL,created_on TIMESTAMP NOT NULL,last_login TIMESTAMP);
*/

function insertGez(params, uuid) {
    const {page, gender, firstname, secondname, birthday, startDay, street, housenumber, optionalAdress, mobilenumber, accept, payment, payment_via, 
        sname, fname, street_mandat, housenumber_mandat, code_mandat, city_mandat, iban_mandat, bic_mandat, institut_mandat, ort_mandat, accept_mandat} = params;
        var sql;
        var sqlChange;
        switch (page - 1) {
            case 0:
                sql = 'INSERT INTO one (benutzer_id, gender, firstname, secondname, birthday) VALUES ($1, $2, $3, $4, $5)';
                sqldelete = 'DELETE FROM one where ';
              break;
            case 1:
              
              break;
            case 2:
              
              break;
            case 3:

              break;
            case 4:

                break;
            case 5:
              
              break;
            case 6:
              
              break;
            case 7:
              
              break;
            case 8:
              
              break;
            case 9:
              
              break;
            case 10:
              
              break;
            case 11:
              
              break;
            default:
              break;
          }
        return new Promise((resolve, reject) => {
            pool.connect()
                .then(() => {
                    pool
                    .query(sql, values)
                    .then(res => {
                        resolve();
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

                const values = [id, vorname, nachname, passwort, email, nowTimestamp(), nowTimestamp()];
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
    return new Promise((resolve, reject) => {
        const sql = "SELECT benutzer_id, email, password FROM benutzer WHERE email = $1 AND password = $2";
        pool.connect().then(res => {
            pool.query(sql, [email, password])
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
