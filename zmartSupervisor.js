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
      choices: ["View Product Sales by Department", "Create New Department", "Quit Program"],
      name: "option"
    }
  ])
  .then(function(res) {
    switch (res.option) {
    case "View Products for Sale":
      viewSalesByDept();
      break;
    
    case "Create New Department":
      createDept();
      break;
    
    case "Quit Program":
      connection.end();
      break;
    }
  });
}
