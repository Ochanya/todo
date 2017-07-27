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

app.get('/', function(request, response){
  response.render('form');
});

const todos = [
  "Wash the car"
];

app.get("/", function (req, res) {
  res.render('form', { todos: todos });
});

app.post("/", function (req, res) {
  todos.push(req.body.todo);
  res.redirect('/');
})

app.post('/',function(request, response){


request.getValidationResult()

      response.render('entry', {entry: request.body});

  });



app.listen(3000, function(){
  console.log('server started')
});
