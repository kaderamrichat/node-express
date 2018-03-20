var express =     require('express');
var bodyParser =  require('body-parser');
var path =        require('path');

var app = express();

// View Engine

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


//set static path for the front dev
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.render('index', {
    title : 'My main title'
  });
});

app.post('/users/add', function(req, res){
  var newUSer = {
    firstName : req.body.first_name,
    lastName : req.body.last_name,
    email : req.body.email
  };
  console.log(newUSer);
});

app.listen(3000, function(){
  console.log("Server started on port 3000 ");
});
