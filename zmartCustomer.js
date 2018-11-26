var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Rudy1976!",
  database: "zmart_db"
});

//Table constructor
var Table = require('cli-table');

//Main process
connection.connect(function(err) {
  if (err) throw err;
  listInventory();
});



//Functions
function listInventory() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // instantiate table
    var table = new Table({
        head: ['ID', 'Name', 'Price']
      , colWidths: [5, 22, 8]
    });
    for (i=0; i < res.length; i++) {
      table.push([res[i].item_id, res[i].product_name, res[i].price]);
    }
    console.log(table.toString()); 
    connection.end();
  });
}


