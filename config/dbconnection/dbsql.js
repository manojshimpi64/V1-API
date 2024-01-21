// mysqlConnection.js

const mysqli = require('mysqli');

const db = new mysqli({
  //host: 'localhost', // your MySQL host
  //post: 3306, // your MySQL port
  //user: 'your_mysql_user', // your MySQL user
  //passwd: 'your_mysql_password', // your MySQL password
  //db: 'your_mysql_database', // your MySQL database

  host: "localhost",
  user: "root",
  password: "",
  database: "googleauth",
  multipleStatements:true

});



const connectToMySQL = async () => {
  try {
    // Testing the connection
    await db.connect();
    console.log('Connected to MySQL');
  } catch (error) {
    console.error('Error connecting to MySQL:', error.message);
  }
};

module.exports = {
  db,
  connectToMySQL,
};
