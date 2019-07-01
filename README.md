# Zmart Musical Instrument Marketplace (Customer, Manager, and Supervisor Apps)
## UNC Coding Bootcamp Node.js &amp; MySQL Homework  12-3-2018

Screen capture videos of Zmart module functions:
* https://drive.google.com/file/d/1GU5Q_ex4hc-i2D_dvwHYXv_MkXcPYL3w/view?usp=sharing
* https://drive.google.com/file/d/1EiDDKwpD0XSiQjBKhSUidMewvFE1N94b/view?usp=sharing

This app creates a storefront with separate modules for customers, managers, and supervisors to perform tasks. The app takes in orders from customers and depletes stock from the store's inventory. The app allows managers to add new products and track and replenish inventory.The supervisor module allows you to track product sales across your store's departments and then provide a summary of the highest-grossing departments in the store.

This app uses the following tools:
  * MySQL for data persistence and database queries
  * Node.js for Javascript runtime environment
  * Javascript for app logic
  * inquirer npm package for user input
  * cli-table npm package for formatting data tables for display
  * mysql npm package for database queries

Future development of the app will add:
  * Improved input validation

You must have Node.js installed to run this app. Install npm dependencies before running one of the following commands to use the 3 sales modules:
  * node zmartCustomer.js
  * node zmart Manager.js
  * node zmart Supervisor.js