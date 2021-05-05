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

function ad_deleteUser(payload) {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM [Tinder2.0].[user] WHERE id = @id`
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            } 
        });
        request.addParameter('id', TYPES.Int,payload.id)
    
        request.on('requestCompleted', (row) => {
            console.log('User deleted',row)
            resolve('user deleted', row)
        });
        connection.execSql(request)
    })

}
module.exports.ad_deleteUser = ad_deleteUser;

function ad_updateUser(payload){
return new Promise((resolve, reject) => {
    const sql = `UPDATE OI SET 
    name = @name, 
    gender = @gender, 
    region = @region, 
    age = @age,
    email = @email
    FROM [Tinder2.0].[user] as OI
    WHERE id = @id`
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
    request.addParameter('id', TYPES.Int, payload.id)

        request.on('requestCompleted', (row) => {
        console.log('User has been updated', row);
        resolve('User updated', row)
    });
    connection.execSql(request)

});
}
module.exports.ad_updateUser = ad_updateUser