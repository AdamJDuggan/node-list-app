// Button working
let express = require('express');

let app = express();

//the single function in todoController.js
let todoController = require('./controllers/todoController');

//set up template engine
app.set('view engine', 'ejs');

// serve up static files
app.use(express.static('./public'));

//fires the function by passing in app
todoController(app);

// listen to port 
app.listen(9000);
console.log("app.js listening to port 9000");



