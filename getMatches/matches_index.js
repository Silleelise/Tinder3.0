
// get matches-function from db, by using require method
const db = require('../db/db');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.')

    try {
        await db.startDb(); //start db connection
    } catch (error) {
        console.log("Error connecting to the database", error.message)
    }// define methods 
    switch (req.method) {
        case 'GET':
            await get(context, req);
            break;
        case 'POST':
            await post(context, req);
            break
        default:
            context.res = {
                body: "Please get or post"
            };
            break
    }
}
// using post method with async function
async function post(context, req){
    // make try catch statment 
    try{
        let payload = req.body
        // await on Promise from matches function from the database (db.js)
        let users = await db.matches(payload)
        // make empty array
        let all = []
        // make the first loop, with an empty object
        users.forEach(function(u){
            response = {}
        // make next loop that loops throug user.metadata.colname
            u.forEach(function(user){
                console.log(user.value)
                response[user.metadata.colName] = user.value 
                console.log(user.metadata.colName)
            });
        // push response to the empty array called "all", watch line 35
            all.push(response)
        })
        // make context.res with the body object all
        // inside the array "all", is where all the users are from the database 
            context.res = {
                body: all
            }
            // if there is an error it will make a response 400
    } catch(error){
        context.res = {
            status: 400,
            body: error.message
        }
    } 
}
