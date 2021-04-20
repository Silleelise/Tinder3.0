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

function insert(payload){
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO [Tinder2.0].[user] (email, gender, city, birthdate, name, hashed_password) VALUES (@email, @gender, @city, @birthdate, @name, @hashed_password)`
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('email', TYPES.VarChar, payload.email)
        request.addParameter('gender', TYPES.VarChar, payload.gender)
        request.addParameter('city', TYPES.VarChar, payload.city)
        request.addParameter('birthdate', TYPES.Date, payload.birthdate)
        request.addParameter('name', TYPES.VarChar, payload.name)
        request.addParameter('hashed_password', TYPES.VarChar, payload.hashed_password)
       

        request.on('requestCompleted', (row) => {
            console.log('User inserted', row);
            resolve('user inserted', row)
        });
        connection.execSql(request)

    });
}
module.exports.insert = insert;

function select(name){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM [Tinder2.0].[user] where name = @name'
        const request = new Request(sql, (err, rowcount) => {
            if (err){
                reject(err)
                console.log(err)
            } else if (rowcount == 0) {
                reject({message: 'User does not exist'})
            }
        });
        request.addParameter('name', TYPES.VarChar, name)
    
        request.on('row', (columns) => {
            resolve(columns)
        });
        connection.execSql(request)
    })

}
module.exports.select = select;

function patch(payload){
    return new Promise((resolve, reject) => {
        const sql = `UPDATE [Tinder2.0].[user] SET 
        email = '@email', 
        gender = '@gender', 
        city = '@city', 
        birthdate = '@birthdate', 
        name = '@name', 
        WHERE name = '@name'`
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('email', TYPES.VarChar, payload.email)
        request.addParameter('gender', TYPES.VarChar, payload.gender)
        request.addParameter('city', TYPES.VarChar, payload.city)
        request.addParameter('birthdate', TYPES.Date, payload.birthdate)
        request.addParameter('name', TYPES.VarChar, payload.name)
       

        request.on('requestCompleted', (row) => {
            console.log('User has been updated', row);
            resolve('User updated', row)
        });
        connection.execSql(request)

    });
}
module.exports.patch = patch;

function DELETE(name, city){
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM [Tinder2.0].[user] WHERE name = @name`
        const request = new Request(sql, (err, rowcount) => {
            if (err){
                reject(err)
                console.log(err)
            } else if (rowcount == 0) {
                reject({message: 'User does not exist'})
            }
        });
        request.addParameter('name', TYPES.VarChar, name)
    
    
        request.on('row', (columns) => {
            resolve(columns)
        });
        connection.execSql(request)
    })

}
module.exports.DELETE = DELETE;

function login(name, city) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM [Tinder2.0].[user] WHERE name = @name AND city = @city`
        const request = new Request(sql, (err, rowcount) => {
            if (err){
                reject(err)
                console.log(err)
            } else if (rowcount == 0) {
                reject({message: 'User does not exist'})
            }
        });
        request.addParameter('name', TYPES.VarChar, name)
        request.addParameter('city', TYPES.VarChar,city)
    
        request.on('row', (columns) => {
            resolve(columns)
        });
        connection.execSql(request)
    })

}
module.exports.login = login;