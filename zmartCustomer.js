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
  customer();
});



//Functions
function customer() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // instantiate table
    var table = new Table({
        head: ['ID', 'Name', 'Price'], 
        colWidths: [5, 22, 8]
    });
    //populate table
    for (i=0; i < res.length; i++) {
      table.push([res[i].item_id, res[i].product_name, res[i].price]);
    }
    //print inventory
    console.log(table.toString() + "\n");
    //user input
    inquirer
    .prompt([
      {
      type: "input",
      message: "Enter the ID of the product you would like to buy.",
      name: "id"
      },
      {
      type: "input",
      message: "Enter the quantity of this item you would like to purchase.",
      name: "quantity"
      }
    ])
    .then(function(userInput) {
      if (userInput.quantity > res[userInput.id -1].stock_quantity) {
      console.log("Insufficient stock!");
      return;
      }
      else {
        var newQuantity = parseFloat(res[userInput.id -1].stock_quantity - userInput.quantity);
        connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: newQuantity
            },
            {
              item_id: userInput.id
            }
          ],
          function(error) {
            if (error) throw error;
            console.log("Total order amount: " + (userInput.quantity * res[userInput.id - 1].price));
            connection.end();
          }
        );
      }
    });
  });
}




