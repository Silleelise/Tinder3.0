const db = require('../db/db');

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
            break
        default:
            context.res = {
                body: "Please get or post"
            };
            break
    }
}

async function get(context, req){
    try{
        let payload = req.body
        let user= await db.matches(payload)
        context.res = {
                body: user
        }
        // context.res = {}
        // user.forEach(function(user){
        //     context.res[user.metadata.colName] = user.value
        // })

    } catch(error){
        context.res = {
            status: 400,
            body: error.message
        }
    }
}
