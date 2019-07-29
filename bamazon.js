require("dotenv").config();
var pw = require("./keys.js");
var inquirer = require("inquirer");
var mysql = require("mysql");
// var password = new Password(keys.sql);
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
        storeBuy();
    });
};



function storeBuy() {
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
        // After the prompt, store the user's response in a variable called location.
    ]).then(function (action) {
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
                        if (error) throw err;
                        console.log("Your total comes out to $" + (parseInt(action.productTotal) * res[product].price).toFixed(2));
                    }
                );

            }
            else {
                console.log("We don't have that much in stock!")
            }

        });
    });
}



storeFront();

// function postThis() {
//    inquirer.prompt([
//        {
//            type: "input",
//            name: "postItem",
//            message: "Name the item you want to post"
//        },
//        {
//            type: "input",
//            name: "postCat",
//            message: "Name the category of the item you're posting"
//        },
//        {
//            type: "input",
//            name: "startingBid",
//            message: "What is the lowest amount of money you'd accept for this item?"
//        },
//    ]).then(function (action) {
//        connection.query("INSERT INTO auctions SET ?",
//            {
//                item: action.postItem,
//                category: action.postCat,
//                highest_bid: action.startingBid,
//            },
//            function (err, res) {
//                if (err) throw err;
//                console.log(res.affectedRows + " item inserted!\n");
//                connection.end();
//                mainInq();
//            })
//        })
//    };
// function exit() {
//    return console.log("Thank for for shopping with Bamazon")
// };


// connection.end();