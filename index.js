const express = require('express')
const mysql = require('mysql')
const { uniqueNamesGenerator, names} = require('unique-names-generator');
const app = express()



app.get('/', async(req, res) => {
  try {
    const randomName = uniqueNamesGenerator({ dictionaries: [names] }); // big_red_donkey
    const querr = 'INSERT INTO peoples(name) VALUES (?);' 
    connection.query(querr, randomName)
    

    const namesDb = connection.query('SELECT name FROM peoples;', (err, result) => {
      if (err) 
        return res.status(404).json({"err": "ERRO 404" })
      const listNames = result.map(name => name.name)
      return res.send("<h1>Full Cycle Rocks!</h1> <br> "+ listNames)
    })
  } catch (error) {
    console.log(error)    
  }
})

const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'db'
});

connection.connect((err) => {
  if (err) throw err;
  connection.query("CREATE DATABASE IF NOT EXISTS db;", function (err, result) {
    if (err) throw err;
  });
  connection.query(`
    CREATE TABLE IF NOT EXISTS peoples(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=INNODB;
    `,
  function (err, result) {
    if (err) throw err;
    console.log("Table Created")
  });
  console.log('Connected!');
  app.listen(3333, () => console.log('started server'))
});





