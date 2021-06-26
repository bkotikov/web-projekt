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
        var sqlupdate;
        var values;
        switch (parseInt(page)) {
            case 0:
                sqlupdate = 'UPDATE daten SET gender = $2, firstname = $3, secondname = $4, birthday = $5 where benutzer_id = $1';
                values = [uuid, gender, firstname, secondname, birthday];
                break;
            case 1:
                sqlupdate = 'UPDATE daten SET benutzer_id = $1, startDay = $2 where benutzer_id = $1';
                values = [uuid, startDay + '-01'];
                break;
            case 2:
                sqlupdate = 'UPDATE daten SET benutzer_id = $1, street = $2, housenumber = $3 where benutzer_id = $1';
                values = [uuid, street, housenumber];
                break;
            case 3:
                sqlupdate = 'UPDATE daten SET benutzer_id = $1, optionalAdress = $2  where benutzer_id = $1';
                values = [uuid, optionalAdress];
                break;
            case 4:
                sqlupdate = 'UPDATE daten SET benutzer_id = $1, mobilenumber = $2  where benutzer_id = $1';
                values = [uuid, mobilenumber];
                break;
            case 5:
                sqlupdate = 'UPDATE daten SET benutzer_id = $1, accept = $2  where benutzer_id = $1';
                values = [uuid, accept];
                break;
            case 6:
                sqlupdate = 'UPDATE daten SET benutzer_id = $1, payment = $2  where benutzer_id = $1';
                values = [uuid, payment];
                break;
            case 7:
                sqlupdate = 'UPDATE daten SET benutzer_id = $1, payment_via = $2  where benutzer_id = $1';
                values = [uuid, payment_via];
                break;
            case 8:
                sqlupdate = 'UPDATE daten SET benutzer_id = $1, sname = $2, fname = $3 where benutzer_id = $1';
                values = [uuid, sname, fname];
                break;
            case 9:
                sqlupdate = 'UPDATE daten SET benutzer_id = $1, street_mandat = $2, housenumber_mandat = $3, code_mandat = $4, city_mandat = $5 where benutzer_id = $1';
                values = [uuid, street_mandat, housenumber_mandat, code_mandat, city_mandat];
                break;
            case 10:
                sqlupdate = 'UPDATE daten SET benutzer_id = $1, iban_mandat = $2, bic_mandat = $3, institut_mandat = $4, ort_mandat = $5 where benutzer_id = $1';
                values = [uuid, iban_mandat, bic_mandat, institut_mandat, ort_mandat];
                break;
            case 11:
                sqlupdate = 'UPDATE daten SET benutzer_id = $1, accept_mandat = $2  where benutzer_id = $1';
                values = [uuid, accept_mandat];
                break;
            default:
                console.log("default");
                return;
          }
          var sqlInsert = 'INSERT INTO daten (benutzer_id) VALUES ($1)'
          
        return new Promise((resolve, reject) => {
            
                    console.log("connect");
                    pool
                    .query(sqlInsert, [uuid])
                    .then(res => {
                            console.log("insert new user");
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
                        resolve(res);
                    })
                    .catch(res => {
                        console.log("user already da");
                        pool
                        .query(sqlupdate, values)
                        .then(res =>{
                            console.log("updateGEZ");
                            resolve(res);
                        })
                        .catch(err => {
                            console.log("updateGEZ/fehler");
                            console.log(err);
                            reject(err);
                        })
                            resolve(res);
                        });
        });
        
}


function getAllDataGez(userid) {
    console.log("id: " + userid);
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM odf";
        
            pool.query(sql, [userid])
            .then(result => {
                //const { benutzer_id, email, password} = result.rows[0];
                resolve(result.rows);
                res.end();
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    });
}


function insertUser(values) {
    const { vorname, nachname, passwort, email } = values;
    console.log("Vorname: " + vorname + "Nachname: " + nachname + "passwort: " + passwort + "email: " + email);
    return new Promise((resolve, reject) => {
        
                
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
                        console.log(err);
                        console.log("registration/fehler");
                        reject(err);
                    });
    });
}


/*
  create table pdf(
  id serial not null primary key, 
  benutzerID uuid not null, 
  path varchar(255) not null, 
  uploaded timestamp not null default CURRENT_TIMESTAMP);
  */
  



function getFileByUserID(userid) {
    console.log("id: " + userid);
    return new Promise((resolve, reject) => {
        const sql = "SELECT benutzerID, path, name FROM pdf WHERE benutzerID = $1";
        
            pool.query(sql, [userid])
            .then(result => {
                //const { benutzer_id, email, password} = result.rows[0];
                resolve(result.rows);
                res.end();
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    });
}

function getUserByEmail(params) {
    const { email, password } = params;
    console.log("email: " + email);
    console.log("passwort: " + password);
    return new Promise((resolve, reject) => {
        const sql = "SELECT benutzer_id, email, password FROM benutzer WHERE email = $1 AND password = $2";
        
            pool.query(sql, [email, password])
            .then(result => {
                //const { benutzer_id, email, password} = result.rows[0];
                resolve(result.rows[0]);
            })
            .catch(err => {
                
                console.log(err);
                reject(err);
            });
    });
}

function getUserByUuid(uuid) {
    
    return new Promise((resolve, reject) => {
        const sql = "SELECT benutzer_id FROM benutzer WHERE benutzer_id = $1";
        
            console.log("connect uuid");
            pool.query(sql, [uuid])
            .then(result => {
                //const { benutzer_id, email, password} = result.rows[0];
                console.log("uuid: " + uuid);
                resolve(result.rows[0]);
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
    insertGez,
    getUserByUuid,
    getFileByUserID
}
