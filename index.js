var express = require("express");
var bodyParser = require("body-parser");
var app = express();


var todos = [
    {
        title: "Wash socks",
        description: "wash your dirty socks",
        done: false,
        date: "7/01/2017",
        id: 1
    },
    
     {
        title: "Mail postcards",
        description: "Mail Xmas postcards",
        done: false,
        date: "20/12/2016",
        id: 2
    }
    
];

var id = todos.length;


app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/todos', function(req,res) {
    res.status(200).send(todos);
});

app.get('/api/todos/:id', function(req, res) {
    if(req.params.id <= id) 
        res.status(200).send(todos.find(function(element) {
            return element.id == req.params.id;
        }))
    else
        res.status(404).send("Couldn't find a task with id #"+req.params.id);
});

app.post('/api/todos', function(req, res){
    id++;
    var date = new Date();
    var dateString = date.getDate()+"/"+(date.getMonth()+1)+"/"+(date.getYear()+1900);
    todos.push( {
        title: req.body.title,
        id: id,
        description: 'Add yout description here',
        date: dateString,
        done: false
    });
    res.status(200).send("Added new task: " + req.body.title );
});

app.delete('/api/todos/:id', function(req, res) {
    
    var index = todos.findIndex(function(element){
        return element.id == req.params.id;
    });
    
    if(index == -1)
        res.status(404).send("Couldn't find task with id #" + req.params.id);
    
    else {
        todos.splice(index,1)
        res.status(200).send("Task #"+ req.params.id +" deleted successfully");
    }
    
});

app.listen(3000, function () {
    console.log("Listening on port 3000...");
});