var Connection = require('tedious').Connection;
var Request = require('tedious').Request

const config = require('../db/config.json')

const executeSQL = (context, user) => {
    var result = '';

    // create connection object
    const connection = new Connection(config);
    
    // create command to be executed
    const request = new Request(` SELECT * FROM [Tinder2.0].[user] `, function(err){
        if (err){
            context.log.error(err);
            context.res.status = 500;
            context.res.body = 'Error executing T-SQL command';
        } else {
            context.res = {
                body: result
            }
        }
        context.done();
    });

    // execute request
    connection.on('connect', function(err){
        if (err){
            context.log.error(err);
            context.res.status = 500;
            context.res.body = 'Error connecting to Azure';
            context.done();
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