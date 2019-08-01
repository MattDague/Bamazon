require("dotenv").config();
var pw = require("./keys.js");
var inquirer = require("inquirer");
var mysql = require("mysql");
var chalk = require('chalk');
var Table = require('cli-table-redemption');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: pw.sql.password,
    database: "bamazon_db"
});

function managerView() {
    console.log("")
    inquirer.prompt(
    {
        type: "list",
        name: "managerList",
        message: "What would you like to do today Mr. Manager?\n",
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
        var table = new Table({
            head: [chalk.cyanBright('Item ID'), chalk.cyanBright('Product Name'), chalk.cyanBright('Department'), chalk.cyanBright('price'), chalk.cyanBright('stock')],
        });
        
        for (var i = 0; i < res.length; i++) {
            newRow = []
            newRow.push(res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity)
            table.push(newRow);
        }
        console.log(table.toString());
        managerView();
    });
};

function viewLow(){
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var table = new Table({
            head: [chalk.cyanBright('Item ID'), chalk.cyanBright('Product Name'), chalk.cyanBright('Department'), chalk.cyanBright('price'), chalk.cyanBright('stock')],
        });
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 5){
                newRow = []
                newRow.push(res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity)
                table.push(newRow);
            }
        }
        if(table.length > 0) {
        console.log(table.toString());
        managerView();
        }
        else{
            console.log("\nAll products are sufficiently stocked!")
            managerView();
        }

       
    });
}

function addInventory(){
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
            var table = new Table({
                head: [chalk.cyanBright('Item ID'), chalk.cyanBright('Product Name'), chalk.cyanBright('Department'), chalk.cyanBright('stock')],
            });
            
            for (var i = 0; i < res.length; i++) {
                newRow = []
                newRow.push(res[i].item_id, res[i].product_name, res[i].department_name, res[i].stock_quantity)
                table.push(newRow);
            };
            
            console.log(table.toString());
        console.log(" ")
        inquirer.prompt([
            {
                type: "input",
                name: "productId",
                message: "Enter the ID for the product we need more of!"
            },
            {
                type: "input",
                name: "productTotal",
                message: "How many should we order?"
            }
    
        ]).then(function (action) {
    console.log(" ")
    var product = (parseInt(action.productId) - 1);
            if ((action.productId > res.length) || (action.productId < 1)) {
                console.log("Not a real ID, try again!");
                managerView();
            }
            else {
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: (parseInt(res[product].stock_quantity) + parseInt(action.productTotal))
                        },
                        {
                            item_id: action.productId
                        }
                    ]
                )
                console.log("\nYou got it! We will order " + action.productTotal + "!");
                managerView();
            }   
        })
    });
}

function addProduct(){
    inquirer.prompt([
        {
            type: "input",
            name: "product_name",
            message: "What product would you like to add?"
        },
        {
            type: "input",
            name: "department_name",
            message: "What department is that product in?"
        },
        {
            type: "input",
            name: "price",
            message: "How much does it cost?"
        },
        {
            type: "input",
            name: "stock_quantity",
            message: "How many should we order to start?"
        },
    ]).then(function(action){

       if((Number.isInteger(parseInt(action.price))) && (Number.isInteger(parseInt(action.stock_quantity)))){
        connection.query(
            "INSERT INTO products SET ?",
            {
              product_name: action.product_name,
              department_name: action.department_name,
              price: action.price,
              stock_quantity: action.stock_quantity
            })
            managerView();
        }
        else{
            console.log("Please enter a real price/stock quantity!")
            managerView();
        }
    })
    
}

function exit(){
return connection.end();
};

managerView();