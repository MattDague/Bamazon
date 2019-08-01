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

//function displays options available to manager
function managerView() {
    console.log("")
    inquirer.prompt(
    {
        type: "list",
        name: "managerList",
        message: "What would you like to do today Mr. Manager?\n",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "EXIT"]

    }).then(function(action){
        //switch for managers selection
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

//displays list of all products and their information
function viewProduct(){
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        //variable for new table
        var table = new Table({
            head: [chalk.cyanBright('Item ID'), chalk.cyanBright('Product Name'), chalk.cyanBright('Department'), chalk.cyanBright('price'), chalk.cyanBright('stock')],
        });
        //loop that pushed database items to array, then pushes that array to the table array
        for (var i = 0; i < res.length; i++) {
            newRow = []
            newRow.push(res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity)
            table.push(newRow);
        }
        //displays table
        console.log(table.toString());
        managerView();
    });
};

//function to view items with less than 5 stock
function viewLow(){
    //selects all products from database
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        //variable for table creation
        var table = new Table({
            head: [chalk.cyanBright('Item ID'), chalk.cyanBright('Product Name'), chalk.cyanBright('Department'), chalk.cyanBright('price'), chalk.cyanBright('stock')],
        });
        for (var i = 0; i < res.length; i++) {
            //checks for each item if stock quantity is less than 5 and pushes them to table
            if (res[i].stock_quantity < 5){
                newRow = []
                newRow.push(res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity)
                table.push(newRow);
            }
        }
        //if any item has less than 5 stock the table array will be greater than 0 and therefor created
        if(table.length > 0) {
        console.log(table.toString());
        managerView();
        }
        //if all items have 5 or more stock no table is displayed
        else{
            console.log("\nAll products are sufficiently stocked!")
            managerView();
        }

       
    });
}

//function for adding inventory
function addInventory(){
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
            var table = new Table({
                head: [chalk.cyanBright('Item ID'), chalk.cyanBright('Product Name'), chalk.cyanBright('Department'), chalk.cyanBright('stock')],
            });
            
            //display all products for inventory check
            for (var i = 0; i < res.length; i++) {
                newRow = []
                newRow.push(res[i].item_id, res[i].product_name, res[i].department_name, res[i].stock_quantity)
                table.push(newRow);
            };
            
            console.log(table.toString());
        console.log(" ")
        //prompt to input product and numbers
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
    //variable for matching product id to its spot in the index of the result
    var product = (parseInt(action.productId) - 1);
            // check for existing id
            if ((action.productId > res.length) || (action.productId < 1)) {
                console.log("Not a real ID, try again!");
                managerView();
            }
            //if id exists..
            else {
                connection.query(
                    //update database with amount added
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

//function to add product
function addProduct(){
    //prompt asking for items info
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

        //check to make sure price and quantity and numbers
       if((Number.isInteger(parseInt(action.price))) && (Number.isInteger(parseInt(action.stock_quantity)))){
        connection.query(
            //add to database
            "INSERT INTO products SET ?",
            {
              product_name: action.product_name,
              department_name: action.department_name,
              price: action.price,
              stock_quantity: action.stock_quantity
            })
            managerView();
        }
        //if price/quantity are not numbers
        else{
            console.log("Please enter a real price/stock quantity!")
            managerView();
        }
    })
    
}

//exit function
function exit(){
return connection.end();
};

managerView();