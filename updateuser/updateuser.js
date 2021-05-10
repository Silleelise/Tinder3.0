
// get update function from db, by using require method
const db = require('../db/db');


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.')

    try {
        await db.startDb(); //start db connection
    } catch (error) {
        console.log("Error connecting to the database", error.message)
    } // define methods 
    switch (req.method) {
        case 'GET':
            await get(context, req);
            break;
        case 'POST': 
            await post(context, req);
            break;
        case 'PATCH':
            await patch(context, req);
            break;
        default:
            context.res = {
                body: "Please get or post"
            };
            break
    }
}

// using patch method with async function
async function patch(context, req){
    // using try catch statement, to update user 
    try{
        //await on Promise from update function from the database (db.js) 
        let payload = req.body
        await db.update(payload)
        // reponse with a object 
        context.res = {
            body: {status: 'Update succes'}
        }
        // cathing error if the try-statement dosen't work and fails
    } catch(error){
        context.res = {
            status: 400,
            body: error.message
        }
    }
}