
// get delete function from db, by using require method
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
        case 'DELETE':
            await DELETE(context,req);
            break
        default:
            context.res = {
                body: "Please get or delete"
            };
            break
    }
}

// using DELETE method with async function
async function DELETE(context, req){
    // using try catch statement, to delete user 
    try{
        //await on Promise from deleteUser function from the database (db.js) 
        let payload = req.body;
        await db.deleteUser(payload)
        // response with status: 'Delete succes'
        context.res = {
            body: {status: 'Delete succes'}
        };
        // cathing error if the try-statement dosen't work and fails
    } catch(error){
        context.res = {
            status: 400,
            body: `No user - ${error.message}`
        }
    }
}