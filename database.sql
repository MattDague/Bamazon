DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;
CREATE TABLE `products` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(30) NOT NULL,
  `department_name` varchar(30) NOT NULL,
  `price` decimal(5,2) DEFAULT NULL,
  `stock_quantity` int(10) DEFAULT NULL,
  PRIMARY KEY (`item_id`));
  
INSERT INTO products (`product_name`,`department_name`,`price`,`stock_quantity`) 
VALUES ('Headphones','Electronics',24.99,23), 
('Wok','Cookware',79.97,9), 
('Bioshock','Video Games',14.00,14),
('Socks- 10 pack','Fashion',12.45,41),
('Nice Jeans','Fashion',69.99,15), 
('A Single Fork','Cookware',1.29,34),
('World of Warcraft','Video Games',49.99,96),
('Smart Watch','Electronics',189.49,7),
('Frying Pan','Cookware',17.89,9),
('Super Mario Oddyssey','Video Games',59.99,16);