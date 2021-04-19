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
        request.addParameter('email', TYPES.Text, payload.email)
        request.addParameter('gender', TYPES.Text, payload.gender)
        request.addParameter('city', TYPES.Text, payload.city)
        request.addParameter('birthdate', TYPES.Date, payload.birthdate)
        request.addParameter('name', TYPES.Text, payload.name)
        request.addParameter('hashed_password', TYPES.Text, payload.hashed_password)
       

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
        const sql = 'SELECT * FROM Tinder2.0.user where name = @name'
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