const db = require('../admin/admin_db');

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
        case 'DELETE':
            await DELETE(context, req);
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
        //let payload = new User(req.body.email, req.body.gender, req.body.city, req.body.birthdate, req.body.name)
        let payload = req.body
        await db.update(payload)
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

async function DELETE(context, req){
    try{
        let payload = req.body;
        await db.deleteUser(payload)
        context.res = {
            body: {status: 'Delete succes'}
        };
    } catch(error){
        context.res = {
            status: 400,
            body: `No user - ${error.message}`
        }
    }
}