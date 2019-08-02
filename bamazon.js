//requirements for bamazon
require("dotenv").config();
var pw = require("./keys.js");
var inquirer = require("inquirer");
var mysql = require("mysql");
var chalk = require('chalk');
var Table = require('cli-table-redemption');

//creating connection to sql
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: pw.sql.password,
    database: "bamazon_db"
});

//function to call the main store display
function storeFront() {
    //selects all products from database
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        //table creation
        var table = new Table({
            head: [chalk.cyanBright('Item ID'), chalk.cyanBright('Product Name'), chalk.cyanBright('Department'), chalk.cyanBright('Price'), chalk.cyanBright('Stock')],
        });
        //loop pushes all database items into arrays, then pushes those arrays into table array
        for (var i = 0; i < res.length; i++) {
            newRow = []
            newRow.push(res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity)
            table.push(newRow);
        }
        //displays the table
        console.log(table.toString());
        //calls the buy function once table is showing
        storeBuy(res);
    });
};

//function for purchasing
function storeBuy(res) {
    inquirer.prompt([
        {
            type: "input",
            name: "productId",
            message: "Enter the ID for the product you would like to buy!"
        },
        {
            type: "input",
            name: "productTotal",
            message: "How many units do you want?"
        }

    ]).then(function(action) {
        //checks to make sure product id exists
        if ((action.productId > res.length) || (action.productId < 1)) {
            console.log("Not a real ID, try again!");
            storeFront();
        }
        //if id exists...
        else {
            connection.query("SELECT * FROM products", function (err, res) {
                if (err) throw err;
                //variable to convert id so that it can be found as index of an array
                var product = (parseInt(action.productId) - 1);
                //check for stock quantity
                if (res[product].stock_quantity >= action.productTotal) {
                    connection.query(
                        //update database
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: (res[product].stock_quantity - action.productTotal)
                            },
                            {
                                item_id: action.productId
                            }
                        ],
                        function (error) {
                            if (error) throw error;
                            //post purchase display and connection end
                            console.log("We will send you " + action.productTotal + " of those right away!")
                            console.log("Your total comes out to $" + (parseInt(action.productTotal) * res[product].price).toFixed(2));
                            connection.end();
                            return console.log("Thank you for shopping with Bamazon!")
                        }
                    );
                }
                // if product has insufficient quantity
                else {
                    console.log("We don't have that much in stock!\n")
                    storeFront();
                }
            });
        }
    });
}

storeFront();