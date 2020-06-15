var express = require('express');
var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/',(req,res)=>{
  res.send('home')
});

router.get('/student',(req,res)=>{
  res.send('studentpage')
});
router.get('/sregister',(req,res)=>{
  res.send('sregister')
});

router.post('/sregister',(req,res)=>{
  res.send('sregister')
});

router.get('/studentlogin',(req,res)=>{
  res.send('login form')
});

router.get('/studentlogin',(req,res)=>{
  res.send('studentlogin')
});

router.get('/studentlogin',(req,res)=>{
  res.send('studentlogin')
});

router.post('/studentlogin',(req,res)=>{
  res.send('studentlogin')
});
module.exports = router;
