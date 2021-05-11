
// using tedious to make Connection and Request
const { Connection, Request, TYPES } = require("tedious");
// get access to database through microsoft azure
const config = require("./config.json");

// make a variable that use connection with config 
var connection = new Connection(config);


function startDb() {
  // make Promise with resolve and reject
  return new Promise((resolve, reject) => {
    // makes a connection on "connect"
    connection.on("connect", (err) => {
      // if statement that throws error is something went wrong
      if (err) {
        console.log("Connection failed");
        reject(err);
        throw err;
        // else statement that throw resolve method and a console with message "connected"
      } else {
        console.log("Connected");
        resolve();
      }
    });
    // function ends with connection (line 8) with connect method
    connection.connect();
  });
}
// export the the function, so every API have a connection with the database 
module.exports.sqlConnection = connection;
module.exports.startDb = startDb;


// this function can register a user 
function insert(payload) {
  return new Promise((resolve, reject) => {
    // make a Promise statement with resolve and reject 
    const sql = `INSERT INTO [Tinder2.0].[user] (email, gender, region, age, name, hashed_password, interest) VALUES (@email, @gender, @region, @age, @name, @hashed_password, @interest)`;
    // SQL-query with INSERT INTO clause into the table with the parameter "email", "gender", "region", "age", "name", "hashed_password", "interest"
    // after the define the params, we use VALUES clause to insert it the values in the database
    //new Request with sql and err as argument 
    const request = new Request(sql, (err) => {
      // if statement that reject with error 
      if (err) {
        reject(err);
        console.log(err);
      }
    });
    // the following line from 52-57 takes the const request from line 44 and use addParameter 
    // from the register.html, dine what type it is in the database, and use the payload argument from the function
    // and then afterwards define what email is define, like the other lines 
    request.addParameter("email", TYPES.VarChar, payload.email);
    request.addParameter("gender", TYPES.VarChar, payload.gender);
    request.addParameter("region", TYPES.VarChar, payload.region);
    request.addParameter("age", TYPES.Int, payload.age);
    request.addParameter("name", TYPES.VarChar, payload.name);
    request.addParameter(
      "hashed_password",  
      TYPES.VarChar,
      payload.hashed_password
    );
    request.addParameter("interest", TYPES.VarChar, payload.interest);

    // it will resolve on line 69
    request.on("requestCompleted", (row) => {
      console.log("User inserted", row);
      resolve("user inserted", row);
    });
    // final the connection to execute the SQL-query on the parameter request
    connection.execSql(request);
  });
}
// export the function, so it can be worked with in the azure function (API for register a user)
module.exports.insert = insert;


/*
function select(name) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM [Tinder2.0].[user] where name = @name";
    const request = new Request(sql, (err, rowcount) => {
      if (err) {
        reject(err);
        console.log(err);
      } else if (rowcount == 0) {
        reject({ message: "User does not exist" });
      }
    });
    request.addParameter("name", TYPES.VarChar, name);

    request.on("row", (columns) => {
      resolve(columns);
    });
    connection.execSql(request);
  });
}
module.exports.select = select;
*/

// this is the update function, that can change the values of an existing user 
function update(payload) {
  return new Promise((resolve, reject) => {
    // SQL-query that update user, and it can update every value 
    // the user can update on email, because it is a unique value
    const sql = `UPDATE OI SET 
        name = @name, 
        gender = @gender, 
        region = @region, 
        age = @age,
        interest = @interest
        FROM [Tinder2.0].[user] as OI
        WHERE email = @email`;
    const request = new Request(sql, (err) => {
      5;
      if (err) {
        reject(err);
        console.log(err);
      }
    });
    // the following line from 126-131 takes the const request from line 115 and use addParameter 
    // from the update.html, dine what type it is in the database, and use the payload argument from the function line 103
    // and then afterwards define what email and its value from the controller, like the other lines 
    console.log(payload.email);
    request.addParameter("email", TYPES.VarChar, payload.email);
    request.addParameter("gender", TYPES.VarChar, payload.gender);
    request.addParameter("region", TYPES.VarChar, payload.region);
    request.addParameter("age", TYPES.Int, payload.age);
    request.addParameter("name", TYPES.VarChar, payload.name);
    request.addParameter("interest", TYPES.VarChar, payload.interest);

    // the resolve method is used in 136
    request.on("requestCompleted", (row) => {
      console.log("User has been updated", row);
      resolve("User updated", row);
    });
    // final the connection to execute the SQL-query on the parameter request
    connection.execSql(request);
  });
}
  // now the update function is exportet so it can be used in our http function (API)
module.exports.update = update;

  // delete function 
function deleteUser(payload) {
  return new Promise((resolve, reject) => {
    // this SQL-query can delete a user onyl with their email 
    // is the database can recognize the email, the user will be deleted 
    const sql = `DELETE FROM [Tinder2.0].[user] WHERE email = @email`;
    const request = new Request(sql, (err) => {
      if (err) {
        reject(err);
        console.log(err);
      }
    });
    // same syntax as the other functions
    request.addParameter("email", TYPES.VarChar, payload.email);

    // the request will be resolve on line 163
    request.on("requestCompleted", (row) => {
      console.log("User deleted", row);
      resolve("user deleted", row);
    });
    // the SQL-query will be executed 
    connection.execSql(request);
  });
}
// exporting the function so it can be used in the API
module.exports.deleteUser = deleteUser;


function login(payload) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM [Tinder2.0].[user] WHERE email = @email AND hashed_password = @hashed_password`;
    const request = new Request(sql, (err, rowcount) => {
      if (err) {
        reject(err);
        console.log(err);
      } else if (rowcount == 0) {
        reject({ message: "User does not exist" });
      }
    });
    request.addParameter("email", TYPES.VarChar, payload.email);
    request.addParameter(
      "hashed_password",
      TYPES.VarChar,
      payload.hashed_password
    );

    request.on("row", (columns) => {
      resolve(columns);
    });
    connection.execSql(request);
  });
}

module.exports.login = login;

//Last function in the database 
// this function can search for a potential match
function matches(payload) {
  return new Promise((resolve, reject) => {
    //make empty array
    let result = [];
    // SQL-query that can pick a user fron region and gender 
    const sql = `SELECT name, gender, region, age 
        FROM [Tinder2.0].[user] 
        WHERE gender = @gender AND region = @region`;
    const request = new Request(sql, (err, rowcount) => {
      //if reject, then console log error
      if (err) {
        reject(err);
        console.log(err);
        // else resolve the result, which is an array with the users from the databases 
      } else {
        resolve(result);
      }
      //context.done();
    });
    request.addParameter("gender", TYPES.VarChar, payload.gender);
    request.addParameter("region", TYPES.VarChar, payload.region);

    // push the result into columns
    request.on("row", (columns) => {
      result.push(columns);
    });
    // execute the sql with request as the argument 
    connection.execSql(request);
  });
}
// export the module so it can be used in the API for matches 
module.exports.matches = matches;
