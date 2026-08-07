const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password:"876787",
});

let  getRandomUser = () =>  {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];``
} 

//printing total numbers of users...
app.get("/", (req, res) => {
    let q = `SELECT count(*) FROM USER`;
    try {
        connection.query(q, (err,result) => {
            if (err) throw err;
            console.log(result[0]["count(*)"]);
            res.send(result);
        });
    } catch (err) {
        console.log(err);
        res.send("Some Error in DB...");
    }

})

app.listen(8080 , () => {
    console.log("Server is listening on port 8080");
});


// // INSERTING NEW DATA 
// let q = "INSERT INTO user (id, username, email, password) VALUES ?";

// let data = [];

// for(let i=1; i <= 100; i++) {
//     data.push(getRandomUser());
// }


// try {
//     connection.query(q, [data], (err, result) => {
//         if(err) throw err;
//         console.log(result);
//     });
// } catch(err) {
//     console.log(err);
// }

// connection.end();


