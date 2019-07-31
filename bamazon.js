require("dotenv").config();
var pw = require("./keys.js");
var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: pw.sql.password,
    database: "bamazon_db"
});

function storeFront() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + "  " + res[i].product_name + "  " + res[i].department_name + "  " + res[i].price + "  " + res[i].stock_quantity);
        }
        storeBuy(res);
    });
};

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

    ]).then(function (action) {

        if ((action.productId > res.length) || (action.productId < 1)) {
            console.log("Not a real ID, try again!");
            storeFront();
        }
        else {

            connection.query("SELECT * FROM products", function (err, res) {
                if (err) throw err;
                var product = (parseInt(action.productId) - 1);
                console.log("The product you picked has " + res[product].stock_quantity)
                console.log("you asked for " + action.productTotal + " units")
                if (res[product].stock_quantity >= action.productTotal) {
                    connection.query(
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
                            console.log("Your total comes out to $" + (parseInt(action.productTotal) * res[product].price).toFixed(2));
                            connection.end();
                            return console.log("Thank for for shopping with Bamazon!")
                        }
                    );
                }
                else {
                    console.log("We don't have that much in stock!")
                }
            });
        }
    });
}

storeFront();