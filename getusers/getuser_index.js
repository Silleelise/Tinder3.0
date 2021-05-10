// using tedious to make Connection and Request 
var Connection = require('tedious').Connection;
var Request = require('tedious').Request

// get access to database through microsoft azure
const config = require('../db/config.json')

// make function with a new connection and new request 
const executeSQL = (context, user) => {
    var result = '';

    const connection = new Connection(config);
    
    // make SQL-query 
    const request = new Request(` SELECT COUNT(*) FROM [Tinder2.0].[user] `, function(err){
        // if else satement,
        // i statment handle error
        if (err){
            context.log.error(err);
            context.res.status = 500;
            context.res.body = 'Error executing T-SQL command';
            // else stament handle response
        } else {
            context.res = {
                body: result
            }
        }
        context.done();
    });
    // another if else statment inside connection.on
    connection.on('connect', function(err){
        // if error = handle error 
        if (err){
            context.log.error(err);
            context.res.status = 500;
            context.res.body = 'Error connecting to Azure';
            context.done();
            // else handle connection from function execSql (line 9), with request as a argument (line 15)
        } else {
            connection.execSql(request)
        }
    });

    // handle result send back from azure
    request.on('row', columns => {
        columns.forEach(column => {
            result += column.value
        });
    });

    // connect
    connection.connect();
}
module.exports = function (context, req) {
    context.log('data has been sent');
    const userID = (req.query.user || (req.body && req.body.user));
    executeSQL(context, userID)
}