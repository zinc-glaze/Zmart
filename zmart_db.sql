DROP DATABASE IF EXISTS Zmart_db;
CREATE DATABASE Zmart_db;

USE Zmart_db;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL (20,2) default 0,
  stock_quantity INT default 0,
  product_sales DECIMAL (20,2) default 0,
  PRIMARY KEY (item_id)
);

insert into products (product_name, department_name, price, stock_quantity)
values ("Moog Minimoog", "Synths", 1000.00, 5);
insert into products (product_name, department_name, price, stock_quantity)
values ("ARP 2600", "Synths", 2500.00, 2);
insert into products (product_name, department_name, price, stock_quantity)
values ("Roland Jupiter 8", "Synths", 800.00, 12);
insert into products (product_name, department_name, price, stock_quantity)
values ("Fender Rhodes", "Keyboards", 120.00, 6);
insert into products (product_name, department_name, price, stock_quantity)
values ("Vox Continental", "Keyboards", 750.00, 3);
insert into products (product_name, department_name, price, stock_quantity)
values ("Fender Jazzmaster", "Guitars", 700.00, 10);
insert into products (product_name, department_name, price, stock_quantity)
values ("Fender Telecaster", "Guitars", 900.00, 9);
insert into products (product_name, department_name, price, stock_quantity)
values ("Gibson Les Paul", "Guitars", 1400.00, 7);
insert into products (product_name, department_name, price, stock_quantity)
values ("Guitar Strings", "Accessories", 8.00, 46);
insert into products (product_name, department_name, price, stock_quantity)
values ("Bass Strings", "Accessories", 25.00, 23);
insert into products (product_name, department_name, price, stock_quantity)
values ("Electronic Tuner", "Accessories", 40.00, 11);

SELECT * FROM products;

CREATE TABLE departments(
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(45) NOT NULL,
  overhead_costs DECIMAL (20,2) default 0,
  PRIMARY KEY (department_id)
);

insert into departments (department_name, overhead_costs)
values ("Synths", 210.00);
insert into departments (department_name, overhead_costs)
values ("Keyboards", 420.00);
insert into departments (department_name, overhead_costs)
values ("Guitars", 1500.00);
insert into departments (department_name, overhead_costs)
values ("Accessories", 50.00);

SELECT * FROM departments;