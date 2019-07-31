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

// function storeFront() {
//     connection.query("SELECT * FROM products", function (err, res) {
//         if (err) throw err;
//     })
// }

function managerView() {
    inquirer.prompt(
    {
        type: "list",
        name: "managerList",
        message: "What would you like to do today Mr. Manager?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "EXIT"]

    }).then(function(action){

        switch (action.managerList) {
            case "View Products for Sale":
                viewProduct();
                break;
            case "View Low Inventory":
                viewLow();
                break;
            case "EXIT":
                exit();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addProduct();
                break;
        }
    })
};

function viewProduct(){
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + "  " + res[i].product_name + "  " + res[i].department_name + "  " + res[i].price + "  " + res[i].stock_quantity);
        }
        managerView();
    });
};

function viewLow(){
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 5){
            console.log(res[i].item_id + "  " + res[i].product_name + "  " + res[i].department_name + "  " + res[i].price + "  " + res[i].stock_quantity);
            }
        }
        managerView();
    });
}

function exit(){
return connection.end();
};








managerView();