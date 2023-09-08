const mysql= require('mysql2')
require('dotenv').config();


const connection = mysql.createConnection({ /* creates mysequel connection */
  host: 'localhost',
  user: 'root',
  password: process.env.my_password,
  database: 'Employee_Records',
});

module.exports = connection