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
    case "View Product Sales by Department":
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

function viewSalesByDept() {

}

function createDept() {
  inquirer
  .prompt([
    {
      type: "input",
      message: "Enter the new department name:",
      name: "department_name"
    },
    {
      type: "input",
      message: "Enter the department overhead costs:",
      name: "overhead_costs"
    }
  ])
  .then(function(res) {
    var query = connection.query(
      "INSERT INTO departments SET ?",
      {
        department_name: res.department_name,
        overhead_costs: res.overhead_costs,
      },
      function(err, res) {
        if (err) throw err;
        console.log("New department added successfully!\n");
        menuOptions();
      }
    );
  });
}

