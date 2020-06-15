// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res, next) {
///todo check parameter .json
  res.json({
      student:req.params.id,
  });
});
router.get('/',(req,res)=>{
    res.json('all students')
  });

module.exports = router;


