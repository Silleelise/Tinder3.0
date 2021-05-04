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

function login(payload) { 
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM [Tinder2.0].[admin] WHERE email = @email AND hashed_password = @hashed_password`
        const request = new Request(sql, (err, rowcount) => {
            if (err){
                reject(err)
                console.log(err)
            } 
            else if (rowcount == 0) {
                reject({message: 'Accesses not allowed to admin page'})
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

module.exports.login = login;

function update(payload){
    return new Promise((resolve, reject) => {
        const sql = `UPDATE OI SET 
        name = @name, 
        gender = @gender, 
        region = @region, 
        age = @age,
        interest = @interest
        FROM [Tinder2.0].[user] as OI
        WHERE email = @email`
        const request = new Request(sql, (err) => {5
            if (err){
                reject(err)
                console.log(err)
            }
        });
        console.log(payload.email)
        request.addParameter('email', TYPES.VarChar, payload.email)
        request.addParameter('gender', TYPES.VarChar, payload.gender)
        request.addParameter('region', TYPES.VarChar, payload.region)
        request.addParameter('age', TYPES.Int, payload.age)
        request.addParameter('name', TYPES.VarChar, payload.name)
        request.addParameter('interest', TYPES.VarChar, payload.interest)
    
            request.on('requestCompleted', (row) => {
            console.log('User has been updated', row);
            resolve('User updated', row)
        });
        connection.execSql(request)

    });
}
module.exports.update = update;

function deleteUser(payload) {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM [Tinder2.0].[user] WHERE email = @email`
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            } 
        });
        request.addParameter('email', TYPES.VarChar,payload.email)
    
        request.on('requestCompleted', (row) => {
            console.log('User deleted',row)
            resolve('user deleted', row)
        });
        connection.execSql(request)
    })

}
module.exports.deleteUser = deleteUser;
