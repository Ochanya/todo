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

let todoList = []

app.get('/', function(request, response){
  response.render('todos', {todos: todoList});
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
  let id = parseInt(Math.random()*1000);
  newtodoList = {name: req.body.todo, id:id}
  todoList.push(newtodoList);

console.log(req.body);
  todoList.push(req.body.todo);
  //todo refers to the name value  of input in the template todo.mustache
  res.redirect('/');
});

app.post('/mark-complete/:id', function (req, res) {
  let completedId= parseInt(req.params.id);
  let completedTodo = todoList.find(function(todo){
    return todo.id === completedId
  });
  completedTodo.complete =true;
  res.redirect('/');

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
