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
    "SELECT * FROM (SELECT department_id, department_name, overhead_costs FROM departments) AS dept RIGHT JOIN (SELECT department_name, SUM(product_sales) AS product_sales FROM products GROUP BY department_name) AS prod ON prod.department_name = dept.department_name", 
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
        if (!res[i].product_sales || res[i].product_sales === null ) {
          var productSales = 0;
        } else {
          var productSales = res[i].product_sales;
        }
        //calculate total profit by department
        var totalProfit = (productSales - res[i].overhead_costs).toFixed(2);
        //push to table row
        table.push([res[i].department_id, res[i].department_name, "$" + res[i].overhead_costs.toFixed(2), "$" + productSales.toFixed(2), "$" + totalProfit]);
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
    name: "overhead_costs",
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
      "INSERT INTO departments SET ?",
      {
        department_name: res.department_name,
        overhead_costs: res.overhead_costs,
      },
      function(err, res) {
        if (err) throw err;
        console.log("\nNew department added successfully!\n");
        menuOptions();
      }
    );
  });
}

