/* jshint esversion: 6 */
var express =     require('express');
var mysql =       require('mysql');
var bodyParser =  require('body-parser');
var path =        require('path');


//Create connection with port 8889 to match mysql port
const db = mysql.createConnection({
    port     : 8889,
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'nodemysql'
});


db.connect(function(err){
  if(err){
    console.log("Error : " + err.stack);
  }
  console.log('-> Connected as id ' + db.threadId);
});

var app = express();

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


//set static path for the front dev
app.use(express.static(path.join(__dirname, 'public')));


//create Db
app.get('/createdb',(req, res)=>{
  let sql = 'CREATE DATABASE nodemysql';
  db.query(sql,(err, result) => {
    if(err) console.log(err);
    console.log(result);
    res.send('Database created');
  });
});

//create table
app.get('/createpoststable',(req, res) => {
  let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
  db.query(sql, (err, result) => {
    if(err) console.log(err);
    console.log(result);
    res.send('Table posts created');
  });
});

//insert post 1
app.get('/addpost1', (req, res) => {
    let post = {
      title: 'My first post',
      body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
    };
    let sql = 'INSERT INTO posts SET ?'; // le ? pour lui indiquer qu'on va lui passer en parametre quelquechose
    let query = db.query(sql, post, (err, result)=>{
      if(err) console.log(err);
      console.log(result);
      res.send('Post1 added ...');
    });
});

//insert post 2
app.get('/addpost2', (req, res) => {
    let post = {
      title: 'Post2',
      body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
    };
    let sql = 'INSERT INTO posts SET ?'; // le ? pour lui indiquer qu'on va lui passer en parametre quelquechose
    let query = db.query(sql, post, (err, result)=>{
      if(err) console.log(err);
      console.log(result);
      res.send('Post1 added ...');
    });
});

//Select posts
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err, results)=>{
      if(err) console.log(err);
      console.log(results);
      res.send(results);
    });
});

//Select single post
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id =${req.params.id}`;
    let query = db.query(sql, (err, result)=>{
      if(err) throw err;
      console.log(result);
      res.send(result);
    });
});

//Update post
app.get('/updatepost/:id', (req, res) => {
    let newTitle = 'Updated title';
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result)=>{
      if(err) throw err;
      console.log(result);
      res.send("post updated \n" + result );
    });
});

//delete post
app.get('/deletepost/:id', (req, res) => {
    let sql = `DELETE from posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result)=>{
      if(err) throw err;
      console.log(result);
      res.send("post deleted \n" + result );
    });
});





app.get('/', function(req, res){
  res.render('index', {
    title : 'My main title'
  });
});

//to display form's input
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

//db.end();
