const db = require('../db/db');
 
 module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    
    try {
    await db.startDb(); //start db connection
    } catch (error) {
    console.log("Error connecting to the database", error.message)
}
switch (req.method) {
    case 'POST':
        await post(context, req);
        break
     default:
         context.res = {
        body: "please get or post"
            
            }; 
            break
}

async function post(context, req){
    try{
        let name = req.query.name;
        let city = req.query.city;
        let user = await db.login(name, city)
        context.res = {
            body: user
        }
    } catch(error){
        context.res = {
            status: 400,
            body: error.message
        }
    }
}}