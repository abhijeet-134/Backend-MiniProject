const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password:"876787",
});

// INSERTING NEW DATA 
let q = "INSERT INTO user (id, username, email, password) VALUES ?";
let users = [
    ["123b", "123_newuserb", "abc@gmail.comb", "abcb"],
    ["123c", "123_newuserc", "abc@gmail.comc", "abcc"],
];


try {
    connection.query(q, [users], (err, result) => {
        if(err) throw err;
        console.log(result);
    });
} catch(err) {
    console.log(err);
}

connection.end();

let  getRandomUser = () =>  {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}


