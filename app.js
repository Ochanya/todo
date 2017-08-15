
const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

var app = express();

//configure mustache with express

app.engine('mustache', mustacheExpress());
app.set('views','./views');
app.set('view engine', 'mustache');

// app.get('/', function(request, response){
//   response.send('hello');
// });


//allows public folder to be served statically to browser
app.use(express.static('public'));

//confiigure body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//configure the expressValidator
app.use(expressValidator());

let toDoList = [];
let newtoDoList = [];

app.get('/', function(request, response){
  response.render('todos', {todo: newtoDoList});
});

// const todos = [
//   "Wash the car"
// ];
//
// app.get("/", function (req, res) {
//   res.render('form', { todos: todos });
// });
//req.body is the name of  all the input entered according to node
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
      console.log(todo.id)
    }

  });
  if (completedId===completedTodo.id){
      completedTodo.complete=""
  }
  // completedTodo.complete = 2;
console.log(completedTodo)
console.log(completedTodo.id)
  // console.log();
  // console.log(completedTodo.complete);
  res.redirect('/');

    // console.log(completedTodo);
});

// app.post('/',function(request, response){
//
//
// request.getValidationResult()
//
//       response.render('entry', {entry: request.body});
//
//   });



app.listen(3000, function(){
  console.log('server started')
});
