
// getting insert function from db, by using require method
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

// using get method with async function
async function get(context, req){
    // using try catch statement, to get user
    try{
    //await on Promise from select function from the database (db.js) 
    //select user by name
        let name = req.query.name;
        let user = await db.select(name)
        // reponse with a object 
        context.res = {
            body: user
        };
        // cathing error if the try-statement dosen't work and fails
    } catch(error){
        context.res = {
            status: 400,
            body: `No user - ${error.message}`
        }
    }
}
// using post method with async function
async function post(context, req){
    // using try catch statement, to post user
    try{
        //await on Promise from insert function from the database (db.js) 
        let payload = req.body;
        await db.insert(payload)
        // reponse with a object 
        context.res = {
            body: {status: 'Success'}
        }
        // cathing error if the try-statement dosen't work and fails
    } catch(error){
        context.res = {
            status: 400,
            body: error.message
        }
    }
}
