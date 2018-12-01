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
  connection.query(
    "SELECT departments.department_id, departments.department_name, departments.overhead_costs, products.product_sales FROM products RIGHT JOIN departments ON (products.department_name = departments.department_name) GROUP BY department_id ORDER BY departments.department_id", 
    function(err, res) {
      if (err) throw err;
      // instantiate table
      var table = new Table({
        head: ['Department ID', 'Department Name', 'Overhead Costs', 'Product Sales', 'Total Profit'], 
        colWidths: [16, 20, 18, 16, 16]
      });
      //populate table
      for (var i=0; i < res.length; i++) {
        //conditional in case no products exist for a department
        if (!res[i].product_sales) {
          var productSales = 0;
        } else {
          var productSales = res[i].product_sales;
        }
        //calculate total profit by department
        var totalProfit = productSales - res[i].overhead_costs;
        //push to table row
        table.push([res[i].department_id, res[i].department_name, "$" + res[i].overhead_costs, "$" + productSales, "$" + totalProfit]);
      }
      //print table
      console.log("\n" + table.toString() + "\n");
      //call function
      menuOptions();
    }
  );
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

