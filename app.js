var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');
//requiring my hanadlebars
const exphbs  = require('express-handlebars');
const { getHashPassword}=require('./utils/password_hasher')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// const cookieParser = require('cookie-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// To parse cookies from the HTTP Request
app.use(cookieParser());

//setting my port
PORT=8080

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
  extname:'hbs'
}));
app.set('view engine', 'hbs');
// app.set('views', 'views');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//array of the users
var  users=[
  {
  firstname:'john',
  lastname:'nawewe',
  email:'nawewe@gmail.com',
  password: "7cVSMr8mrQOjcB0gyefJPA==",
 }
]
//rendering the home
app.get("/",function(req,res){
  res.render('home')
})
//generate hassh apssword
app.get('/generate',function(req,res){
  password='nawewe';
  hashedPassword=getHashPassword(password)
  res.send(hashedPassword)
  console.log(hashedPassword)
})
//rendering the register page
app.get('/register',function(req,res){
  res.render('register',{
    // message:'this is registration',
    // messageClass:'alert-success'
  })
});

//posting the registration page

  app.post('/register', (req,res)=>{
    const { email, password, firstName, lastName, confirmPassword } = req.body;
    if(password === confirmPassword){
      if(users.find(user=>user.email === email)){
        res.render('register',{
          message:'User Already Exists',
          messageClass:'alert-danger'
        })
        // console.log(`Email: ${email} Passward: ${password}`);
        return;
      }else{
        const hashedPassword = getHashPassword(password);
        users.push({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: hashedPassword
        });
       
        res.render('login', {
          message:'Successfully Registered .login to continue',
          messageClass:'alert-success'
        });
        console.log(JSON.stringify(users))
      }
    }else{
      res.render('registration',{
        message:'Passward not matched',
        messageClass:'alert-danger'
      })
     }
  });
  
  app.get('/login',(req,res)=>{
    res.render('login')
  });
  app.post('/login',(req,res)=>{
    const {email, password} = req.body
    const hashedPassward = getHashPassword(password)
    if(users.find(user=> user.email === email && user.password === hashedPassward)){
      res.render('protected')
    }else{
      res.render('login',{
       message:'User does not exists',
       messageClass:'alert-warning'
      })
    }
  })

  //rendering the protected page
 
  app.get('/protected',(req,res,next) => {
    res.render('auth');
  })



//rendering the login page
app.get('/login',function(req,res){
  res.render('login')
})
// app.post('/login',function(req,res){
//   const {email,password}=req.body
//   const hashedpassword=gethashPassword(password)
//   if(users.find((user) =>users.email===email && users.password===hashedpassword))
// })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//listening to my port
app.listen(PORT,(er)=>{
  if(er) throw er;
  console.log('listening to port 8080')
})
module.exports = app;



