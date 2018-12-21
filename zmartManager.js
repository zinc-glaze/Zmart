//require Inquirer package
var inquirer = require("inquirer");

//require mysql package and set up connection
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
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
        head: ['ID', 'Name', 'Department','Price', 'Quantity'], 
        colWidths: [6, 25, 20, 10, 10]
    });
    //populate table
    for (i=0; i < res.length; i++) {
      table.push([res[i].item_id, res[i].product_name, res[i].department_name, "$" + res[i].price, res[i].stock_quantity]);
    }
    //print inventory
    console.log("\n" + table.toString() + "\n");
    //call function
    menuOptions();
  });
}

function viewLow() {
  connection.query("SELECT * FROM products WHERE stock_quantity < '5'", function(err, res) {
    if (err) throw err;
    // instantiate table
    var table = new Table({
      head: ['ID', 'Name', 'Department','Price', 'Quantity'], 
      colWidths: [6, 25, 20, 10, 10]
    });
    //populate table
    for (i=0; i < res.length; i++) {
      table.push([res[i].item_id, res[i].product_name, res[i].department_name, "$" + res[i].price, res[i].stock_quantity]);
    }
    //print inventory
    console.log("\n" + table.toString() + "\n");
    //call function
    menuOptions();
  });
}

function addInventory() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    //user input
    inquirer
    .prompt([
      {
      type: "input",
      message: "Enter the ID of the product you would like to re-stock: ",
      name: "id",
      validate: function(value) {
        if (isNaN(value) === false && value <= res.length && value >= 1) {
          return true;
        }
        return false;
        }
      },
      {
      type: "input",
      message: "Enter the quantity you would like to add to the stock: ",
      name: "quantity",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
        }
      }
    ])
    .then(function(userInput) {
      var newQuantity = parseInt(res[userInput.id -1].stock_quantity) + parseInt(userInput.quantity);
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
          console.log("\nNew Quantity: " + newQuantity + "\n");
          menuOptions();
        }
      );
    });
  });
}

function addProduct() {
  inquirer
  .prompt([
    {
      type: "input",
      message: "Enter the product name:",
      name: "product_name"
    },
    {
      type: "input",
      message: "Enter the department name:",
      name: "department_name"
    },
    {
      type: "input",
      message: "Enter the product price:",
      name: "price",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    },
    {
      type: "input",
      message: "Enter the stock quantity:",
      name: "stock_quantity",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }
  ])
  .then(function(res) {
    var query = connection.query(
      "INSERT INTO products SET ?",
      {
        product_name: res.product_name,
        department_name: res.department_name,
        price: res.price,
        stock_quantity: res.stock_quantity,
      },
      function(err, res) {
        if (err) throw err;
        console.log("\nYour product was added successfully!\n");
        menuOptions();
      }
    );
  });
}
