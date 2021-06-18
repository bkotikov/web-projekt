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
        var sqlTable;
        var values;
        switch (page - 1) {
            case 0:
                console.log(birthday);
                sqlTable = 'one';
                sql = 'INSERT INTO one (benutzer_id, gender, firstname, secondname, birthday) VALUES ($1, $2, $3, $4, $5)';
                sqlupdate = 'UPDATE one SET benutzer_id = $1, gender = $2, firstname = $3, secondname = $4, birthday = $5 where benutzer_id = \'' + uuid + '\'';
                values = [uuid, gender, firstname, secondname, birthday];
              break;
            case 1:
                sqlTable = 'two';
                sql = 'INSERT INTO two (benutzer_id, startDay) VALUES ($1, $2)';
                sqlupdate = 'UPDATE two SET benutzer_id = $1, startDay = $2 where benutzer_id = \'' + uuid + '\'';
                values = [uuid, startDay + '-01'];
              break;
            case 2:
                sqlTable = 'three';
                sql = 'INSERT INTO three (benutzer_id, street, housenumber) VALUES ($1, $2, $3)';
                sqlupdate = 'UPDATE three SET benutzer_id = $1, street = $2, housenumber = $3 where benutzer_id = \'' + uuid + '\'';
                values = [uuid, street, housenumber];
              break;
            case 3:
                sqlTable = 'four';
                sql = 'INSERT INTO four (benutzer_id, optionalAdress) VALUES ($1, $2)';
                sqlupdate = 'UPDATE four SET benutzer_id = $1, optionalAdress = $2  where benutzer_id = \'' + uuid + '\'';
                values = [uuid, optionalAdress];
              break;
            case 4:
                sqlTable = 'five';
                sql = 'INSERT INTO five (benutzer_id, mobilenumber) VALUES ($1, $2)';
                sqlupdate = 'UPDATE five SET benutzer_id = $1, mobilenumber = $2  where benutzer_id = \'' + uuid + '\'';
                values = [uuid, mobilenumber];
                break;
            case 5:
                sqlTable = 'six';
                sql = 'INSERT INTO six (benutzer_id, accept) VALUES ($1, $2)';
                sqlupdate = 'UPDATE six SET benutzer_id = $1, accept = $2  where benutzer_id = \'' + uuid + '\'';
                values = [uuid, accept];
              break;
            case 6:
                sqlTable = 'seven';
                sql = 'INSERT INTO seven (benutzer_id, payment) VALUES ($1, $2)';
                sqlupdate = 'UPDATE seven SET benutzer_id = $1, payment = $2  where benutzer_id = \'' + uuid + '\'';
                values = [uuid, payment];
              break;
            case 7:
                sqlTable = 'eight';
                sql = 'INSERT INTO eight (benutzer_id, payment_via) VALUES ($1, $2)';
                sqlupdate = 'UPDATE eight SET benutzer_id = $1, payment_via = $2  where benutzer_id = \'' + uuid + '\'';
                values = [uuid, payment_via];
              break;
            case 8:
                sqlTable = 'nine';
                sql = 'INSERT INTO nine (benutzer_id, sname, fname) VALUES ($1, $2, $3)';
                sqlupdate = 'UPDATE nine SET benutzer_id = $1, sname = $2, fname = $3 where benutzer_id = \'' + uuid + '\'';
                values = [uuid, sname, fname];
              break;
            case 9:
                sqlTable = 'ten';
                sql = 'INSERT INTO ten (benutzer_id, street_mandat, housenumber_mandat, code_mandat, city_mandat) VALUES ($1, $2, $3, $4, $5)';
                sqlupdate = 'UPDATE ten SET benutzer_id = $1, street_mandat = $2, housenumber_mandat = $3, code_mandat = $4, city_mandat = $5 where benutzer_id = \'' + uuid + '\'';
                values = [uuid, street_mandat, housenumber_mandat, code_mandat, city_mandat];
              break;
            case 10:
                sqlTable = 'eleven';
                sql = 'INSERT INTO eleven (benutzer_id, iban_mandat, bic_mandat, institut_mandat, ort_mandat) VALUES ($1, $2, $3, $4, $5)';
                sqlupdate = 'UPDATE eleven SET benutzer_id = $1, iban_mandat = $2, bic_mandat = $3, institut_mandat = $4, ort_mandat = $5 where benutzer_id = \'' + uuid + '\'';
                values = [uuid, iban_mandat, bic_mandat, institut_mandat, ort_mandat];
              break;
            case 11:
                sqlTable = 'twelve';
                sql = 'INSERT INTO twelve (benutzer_id, accept_mandat) VALUES ($1, $2)';
                sqlupdate = 'UPDATE twelve SET benutzer_id = $1, accept_mandat = $2  where benutzer_id = \'' + uuid + '\'';
                values = [uuid, accept_mandat];
              break;
            default:
              return;
          }
          var sqlTest = 'SELECT benutzer_id FROM ' + sqlTable + ' where benutzer_id = \'' + uuid + '\''
        return new Promise((resolve, reject) => {
            pool.connect()
                .then(res => {
                    pool
                    .query(sqlTest)
                    .then(res => {
                        if (res.rows.length === 1) {
                            pool
                            .query(sqlupdate, values)
                            .then(res =>{
                                console.log("updateGEZ");
                                resolve(res);
                            })
                            .catch(err => {
                                console.log("updateGEZ/fehler");
                                reject(err);
                            })
                        } else if (res.rows.length === 0) {
                            pool
                        .query(sql, values)
                        .then(res =>{
                            console.log("insert");
                            resolve(res);
                        })
                        .catch(err => {
                            console.log("insertGEZ/fehler");
                            reject(err);
                        })
                        }else{
                            reject();
                        }
                        
                    })
                    .catch(err => {
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
    getUserByEmail,
    insertGez
}
