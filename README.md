# Bamazon


Introduction 
---------------------------------------------

Hello and welcome to my bamazon store! I have developed this app to simulate an online store front throught a CLI. As a customer you can remove items from the stores database by purchasing them. You can also make a multitude of changes to the storefront and its database through the manager file! Every bit of functionality uses node to communicate with a SQL database,


Development
---------------------------------------------
The app is separated into two different javascript files. The first file "bamazon.js" essentially acts as the storefront. When the file is opened with node a connection is immediately established to a mysql database. The database was created to contain rows of items where each item has its own unique id, name, department, cost and stock. This data is retrieved and using the cli-table-redemption NPM package it is given a table to display into. The items are added to this display using a for loop that pushes each item into a row array which is then pushed to the overall table array.

The Buy function is called after the table displays and uses Inquirer to prompt the user to input an item id as well as how much they want to buy. The product availabilty is immediately checked against the users request, this prevents the user from requesting more than the available amount and less than 1. Provided this check is passed the database is updated the the new product amount and the user is shown the total of their purchase. After this the application closes.

In the "bamazonManager.js" file the user is presented with few different options through an Inquirer list. Choosing the view products option simply calls the same table that is displayed in the regular bamazon file. The view low inventory option calls this table again however the way it is filled out changes. It uses the same for loop to fill out the new rows but it has a conditional statement that it will only add to the rows if the quantity is less than 5, therefore producing the low inventory. If no products meet this criteria it will alert the user everything is sufficiently stocked.

The third option in the bamazonManager.js allows the user to add inventory. This option is very similar to the purchase option from the other file but it does the opposite essentially. The user is prompted to enter an id and product amount to order. This id is checked to make sure it falls withhin the table range the database is simply sent a new value for the quantity based on the units ordered plus the old value. The last function immediately gives the user an inquirer prompt to gather information for a products. Once a again qualifier statements are placed here to check the information will be valid for the SQL database. If this check is passed the user will see their new product when the inventory screen is called.



How To Use
-------------------------------------------

Provided the proper NPM depencies are installed simply enter:

<node bamazon.js>   or    <node bamazonManager.js>

For the first option you are immediately presented with an option to enter a product Id of your choosing. Once you enter a valid ID for a product you may then indicated how many you want. If you order an amount less than or equal to the stock quantity and an order will be placed and you will be given a price confirmation!

For the second option you will be sent to the manager view list where you can move up or down using the arrow keys and hit enter to select your option. Selecting the first option will show you all available information for the stores products. You can then select the second option which will show you a smaller table with all of the low stock products. Selecting the third option allows you to add more stock to the current products by choosing an id and the amount you wish to add. The final option requires the most user input as selecting it will present you with a series of prompts in order to add a completely new item to the store. After entering the name, department, cost and stock of your new item you will see it next time you check the inventory!

Tech Demonstration
------------------------------------------------
https://www.youtube.com/watch?v=ztdvl7JGy3E



Technologies Used
----------------------------------------
- Node.js
- Javascript
- NPM 
- SQL
- Chalk (NPM package)
- CLI table redemption (NPM package)
- inquirer
- dotenv




