//require Inquirer package
var inquirer = require("inquirer");

//require mysql package and set up connection
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Rudy1976!",
  database: "zmart_db"
});

//Table constructor
var Table = require('cli-table');

//Connect to db and show menu options
connection.connect(function(err) {
  if (err) throw err;
  menuOptions();
});

//Functions
function menuOptions() {
  inquirer
  .prompt([
    {
      type: "list",
      message: "What would you like to do?",
      choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit Program"],
      name: "option"
    }
  ])
  .then(function(res) {
    switch (res.option) {
    case "View Products for Sale":
      viewProducts();
      break;
    
    case "View Low Inventory":
      viewLow();
      break;
    
    case "Add to Inventory":
      addInventory();
      break;
    
    case "Add New Product":
      addProduct();
      break;

    case "Quit Program":
      connection.end();
      break;
    }
  });
}

function viewProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // instantiate table
    var table = new Table({
        head: ['ID', 'Name', 'Price', 'Quantity'], 
        colWidths: [6, 25, 10, 10]
    });
    //populate table
    for (i=0; i < res.length; i++) {
      table.push([res[i].item_id, res[i].product_name, "$" + res[i].price, res[i].stock_quantity]);
    }
    //print inventory
    console.log("\n" + table.toString() + "\n");
    //call function
    menuOptions();
  });
}