//working 
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://test:Munster1@ds125331.mlab.com:25331/todo');

// create a schema so mongoDB knows the format/blueprint of what to expect from us 
let todoSchema = new mongoose.Schema({
    item: String
});

//create a model of type todo
let Todo = mongoose.model('Todo', todoSchema);
let itemOne = Todo({item: 'get flowers'}).save(function(err) {
    if (err) throw err;
    console.log('item saved');
});
 

let data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'win EVO 2019'}]
let urlencodedParser = bodyParser.urlencoded({extended: false});

// the app variable passed in will be my express app in app.js
module.exports = (app) => {

    app.get('/todo', function(req, res){
        res.render('todo', {todos: data});
    });

    app.post('/todo', urlencodedParser, function(req, res){
    // body parser middleware to handle data which is passed to us
    data.push(req.body);
    res.json(data);
    });

    app.delete('/todo/:item', function(req, res){
        data = data.filter(function (todo)  {
            // this statement returns as either true or false
            // if true the current item remains in the array, if it is same it filters it out of array   
            return todo.item.replace(/ /g, '-').trim() !== req.params.item;
        });
        //send back updated list
        res.json(data);
        console.log(data);  
    });

};