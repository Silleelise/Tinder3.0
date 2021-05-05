const db = require('../ad_db/ad_db');
//const User = require("../model/classes");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.')

    try {
        await db.startDb(); //start db connection
    } catch (error) {
        console.log("Error connecting to the database", error.message)
    }
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

async function patch(context, req){
    try{
        let payload = req.body
        await db.ad_updateUser(payload)
        context.res = {
            body: {status: 'Update succes'}
        }
    } catch(error){
        context.res = {
            status: 400,
            body: error.message
        }
    }
}