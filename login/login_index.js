
// get login function from db, by using require method
const db = require('../db/db');

 module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    
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
        body: "please get or post"
            
            }; 
            break
}

// using post method with async function
async function post(context, req){
    // using try catch statement, to login for a user 
    try{
        let payload = req.body
        //await on Promise from login-function from the database (db.js)
        await db.login(payload)
         // reponse with a object 
        context.res = {
            body: {status: 'Succes with logging in'}
        }
        // cathing error if the try-statement dosen't work and fails
    } catch(error){
        context.res = {
            status: 400,
            body: error.message
        }
    }
}}