var express = require('express');
var router = express.Router();

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
      patient:req.params.id,
  });
});
router.get('/',(req,res)=>{
    res.json('all patient')
  });

module.exports = router;


module.exports = router;
