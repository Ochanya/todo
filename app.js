
const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

var app = express();

app.engine('mustache', mustacheExpress());
app.set('views','./views');
app.set('view engine', 'mustache');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(expressValidator());

let toDoList = [];
let newtoDoList = [];

app.get('/', function(request, response){
  response.render('todos', {todo: newtoDoList});
});

app.post("/", function (req, res) {

  let name = req.body.todo;
  toDoList.push(name);
  let todoid = toDoList.indexOf(name)
  let  id= todoid+1;

  list = {name: req.body.todo, id:id, complete:id}
  newtoDoList.push(list);
  console.log(newtoDoList)

  res.redirect('/');
});

app.post('/:id', function (req, res) {
  let completedId= parseInt(req.params.id);
  let completedTodo = newtoDoList.find(function(todo){
    if( todo.id === completedId){
      return todo.id;
    }
  });
  if (completedId===completedTodo.id){
      completedTodo.complete=""
  }
  res.redirect('/');
});


app.listen(3000, function(){
  console.log('server started')
});
