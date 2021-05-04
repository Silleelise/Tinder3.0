const { Connection, Request, TYPES} = require('tedious');
const config = require('./config.json')
const bcrypt = require('bcrypt');

var connection = new Connection(config)

function startDb(){
    return new Promise((resolve, reject) => {
        connection.on('connect', (err) => {
            if (err) {
                console.log("Connection failed")
                reject(err)
                throw err;
            } else {
                console.log("Connected")
                resolve();
            }
        })
        connection.connect();
    })
}
module.exports.sqlConnection = connection;
module.exports.startDb = startDb;

function ad_login(payload) { 
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM [Tinder2.0].[admin] WHERE email = @email AND hashed_password = @hashed_password`
        const request = new Request(sql, (err, rowcount) => {
            if (err){
                reject(err)
                console.log(err)
            } 
            else if (rowcount == 0) {
                reject({message: 'User does not exist'})
            }
        });
        request.addParameter('email', TYPES.VarChar, payload.email)
        request.addParameter('hashed_password', TYPES.VarChar, payload.hashed_password)
    
        request.on('row', (columns) => {
            resolve(columns)
        });
        connection.execSql(request)
    })

}

module.exports.ad_login = ad_login;

function ad_stats(){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT COUNT (*) FROM [Tinder2.0].[user]'
        const request = new Request(sql, (err, rowcount) => {
            if (err){
                reject(err)
                console.log(err)
            } else if (rowcount == 0) {
                reject({message: 'User does not exist'})
            }
        });
    
        request.on('row', columns => {
            columns.forEach(column => {
                result += column.value
        });
        connection.execSql(request)
    })
    })
}

module.exports.ad_stats = ad_stats;

