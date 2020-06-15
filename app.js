var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');
//requiring my hanadlebars
const exphbs  = require('express-handlebars');
const { getHashPassword}=require('./utils/password_hasher')

// var APIRouter = require('./routes/studentapi');
// var usersRouter = require('./routes/users');
// var TeachersApi=require('./routes/teachersapi')
// var regularRouter=require('./routes/index')



// const cookieParser = require('cookie-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//setting my port
PORT=8080

// view engine setup
app.set('assets',path.join(__filename,'assets'))
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
  extname:'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', 'views');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//array of pateints
var  students=[
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
//registration page for student 
//rendering the register page

//taking you to the student page 
app.get('/student',function(req,res){
  res.render('studentpage',{
    title:'studentpage'
  })
})

app.get('/sregister',function(req,res){
  res.render('register',{
    message:'this is registration',
    messageClass:'alert-success'
  })
});

//posting the registration page for student

  app.post('/sregister', (req,res)=>{
    const { email, password, firstName, lastName, confirmPassword,age,Gender,level } = req.body;
    if(password === confirmPassword){
      if(students.find(student=>student.email === email)){
        res.render('register',{
          message:'User Already Exists',
          messageClass:'alert-danger'
        })
        // console.log(`Email: ${email} Passward: ${password}`);
        return;
      }else{
        const hashedPassword = getHashPassword(password);
        students.push({
          firstName: firstName,
          lastName: lastName,
          email: email,
          age:age,
          Gender:Gender,
          level:level,
          password: hashedPassword
        });
       
        res.render('login', {
          message:'Successfully Registered .login to continue',
          messageClass:'alert-success'
        });
        console.log(JSON.stringify(students))
      }
    }else{
      res.render('registration',{
        message:'Passward not matched',
        messageClass:'alert-danger'
      })
     }
  });
  //login for student 

  app.get('/studentlogin',(req,res)=>{
    res.render('studentlogin',{
      title:"student login"
    })
  });
  //posting the student login
  app.post('/studentlogin',(req,res)=>{
    const {email, password} = req.body
    const hashedPassward = getHashPassword(password)
    if(students.find(student=> student.email === email && student.password === hashedPassward)){
      res.render('studentprofile',{
        title:'student profile',
        StudentSent:students
      })
    }else{
      res.render('studentlogin',{
       message:'User does not exists',
       messageClass:'alert-warning'
      })
    }
  })


  //array of teachers
  var  teachers=[
    {
    firstname:'leslie',
    lastname:'Goerge',
    email:'lesli@gmail.com',
    password: "7cVSMr8mrQOjcB0gyefJPA==",
   }
  ]
  //registration page for teachers
//rendering the register page

//taking you to the teachers  page 
app.get('/teahers',function(req,res){
  res.render('teacherspage',{
    title:'studentpage'
  })
})

app.get('/tregister',function(req,res){
  res.render('tregister',{
    message:'this is registration',
    messageClass:'alert-success'
  })
});

//posting the registration page for teachers

  app.post('/tregister', (req,res)=>{
    const { email, password, firstName, lastName, confirmPassword,Gender,department } = req.body;
    if(password === confirmPassword){
      if(teachers.find(teacher=>teacher.email === email)){
        res.render('tregister',{
          message:'User Already Exists',
          messageClass:'alert-danger'
        })
        // console.log(`Email: ${email} Passward: ${password}`);
        return;
      }else{
        const hashedPassword = getHashPassword(password);
        teachers.push({
          firstName: firstName,
          lastName: lastName,
          email: email,
          Gender:Gender,
          department:department,
          password: hashedPassword
        });
       
        res.render('login', {
          message:'Successfully Registered .login to continue',
          messageClass:'alert-success'
        });
        console.log(JSON.stringify(teachers))
      }
    }else{
      res.render('registration',{
        message:'Passward not matched',
        messageClass:'alert-danger'
      })
     }
  });
  //login for teachers

  app.get('/teacherslogin',(req,res)=>{
    res.render('teacherslogin',{
      title:"student login"
    })
  });
  //posting the teachers login
  app.post('/login',(req,res)=>{
    const {email, password} = req.body
    const hashedPassward = getHashPassword(password)
    if(teachers.find(teacher=> teacher.email === email && student.password === hashedPassward)){
      res.render('teacherprofile',{
        title:'student profile',
        teacherSent:teachers
      })
    }else{
      res.render('studentlogin',{
       message:'User does not exists',
       messageClass:'alert-warning'
      })
    }
  })


  


  //rendering the login page
// app.get('/login',function(req,res){
//   res.render('login')
// })

  //rendering the profile page
 
  app.get('/protected',(req,res,next) => {
    res.render('protected',{
      
  
    });
  })



/
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



