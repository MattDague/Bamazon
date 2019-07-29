DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

use bamazon_db;

CREATE TABLE `products` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(30) NOT NULL,
  `department_name` varchar(30) NOT NULL,
  `price` decimal(5,2) DEFAULT NULL,
  `stock_quantity` int(10) DEFAULT NULL,
  PRIMARY KEY (`item_id`)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Headphones", "Electronics", 24.99, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Super Mario Oddyssey", "Video Games", 59.99, 22);
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Frying Pan", "Cookware", 17.89, 11);
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Smart Watch", "Electronics", 189.49, 7);
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("World of Warcraft", "Video Games", 49.99, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("A Single Fork", "Cookware", 1.29, 36);
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Nice Jeans", "Fashion", 69.99, 17);
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Socks- 10 pack", "Fashion", 12.45, 44);
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Bioshock", "Video Games", 14.00, 16);
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Wok", "Cookware", 79.97, 5);