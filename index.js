const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");


app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

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
// //Home Route 
app.get("/", (req, res) => {
    let q = `SELECT count(*) FROM USER`;
    try {
        connection.query(q, (err,result) => {
            if (err) throw err;
            let count = result[0]["count(*)"];
            res.render("home.ejs", {count});
        });
    } catch (err) {
        console.log(err);
        res.send("Some Error in DB...");
    }
});

// // Show Route
// // Display all users
app.get("/user", (req, res) => {
    let q = "SELECT * FROM user";
    try {
        connection.query(q, (err,users) => {
            if (err) throw err;
            res.render("showusers.ejs", {users});
        });
    } catch (err) {
        console.log(err);
        res.send("Some Error in DB...");
    }
});

// //Edit Route
app.get("/user/:id/edit", (req,res) => {
    let { id } = req.params;
    let q = `SELECT * FROM user WHERE id='${id}'`;
    try {
        connection.query(q, (err,result) => {
            if (err) throw err;
            let user = result[0];
            res.render("edit.ejs", {user});
        });
    } catch (err) {
        console.log(err);
        res.send("Some Error in DB...");
    }
});

// // Update Route 
app.patch("/user/:id", (req, res) => {
    let { id } = req.params;
    let { password: formPasswd, username: newUsername} = req.body;
    let q =`SELECT * FROM USER WHERE id='${id}'`;

    try {
        connection.query(q, (err,result) => {
            if (err) throw err;
            let user = result[0];
            if( formPasswd != user.password) {
                res.send("Wrong Password");
            }else {
                let q2 = `UPDATE user SET username='${newUsername}' WHERE id='${id}'`;
                connection.query(q2, (err,result) => {
                    if (err) throw err;
                    res.redirect("/user");
                })
            }
        });
    } catch (err) {
        console.log(err);
        res.send("Some Error in DB...");
    }

});


// Render a form  to Add New User 
app.get("/user/new", (req,res) => {
    res.render("newuser.ejs");
});

// To Add new User 
app.post("/user/add", (req,res) => {
    let { username, email, password} = req.body;
    let id = faker.string.uuid();
    let q3 = "INSERT INTO user VALUES(?, ?, ?, ?)";
    let data = [
        id,username,email,password
    ];
    connection.query(q3, data ,(err,result) => {
    if (err) {
    console.log(err);
    return res.send("Database Error");
    }
    res.redirect("/user");
    })
})


// // To Delete User
app.delete("/user/:id", (req,res) => {
    let { id } = req.params;
    let q4 = `DELETE FROM user WHERE id='${id}'`;
    try {
        connection.query(q4, (err,result) => {
            if (err) throw err;
            res.redirect("/user"); 
        });
        } catch (err) {
        console.log(err);
        res.send("Some Error in DB...");
    }
});



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
