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

async function post(context, req){
    try{
        let payload = req.body
        let users = await db.matches(payload)
        // console.log(users[0])
        let all = []
        users.forEach(function(u){
            response = {}
            u.forEach(function(user){
                console.log(user.value)
                response[user.metadata.colName] = user.value 
                console.log(user.metadata.colName)
                // reponse = users.value
            });
            all.push(response)
        })
            context.res = {
                body: all
            }
    } catch(error){
        context.res = {
            status: 400,
            body: error.message
        }
    } 
}
