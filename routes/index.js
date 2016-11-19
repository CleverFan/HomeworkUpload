
//var trylogin = require('../util/tryToLogin');
var uploadController = require('../util/uploadController');
var fs = require('fs');

module.exports = function (app) {

  var $times;
  var $stuName;
  var $stuId;
  /* GET home page. */
  app.get('/', function(req, res, next) {
    res.render('index',{errorMsg : "null"});
  });

  app.get('/login',function (req,res,next) {
    res.render('index',{errorMsg : 'null'});
  });

  app.post('/login',function (req,res,next) {
    $times = req.body.times;
    $stuName = req.body.stuName;
    $stuId = req.body.stuId;
    var $pass = req.body.pass;

    if($pass == "bianyiyuanli"){

      var $path = './public/uploads/'+$times+'/'+$stuName+'-'+$stuId;

      if (!fs.existsSync($path)) {
        fs.mkdirSync($path);
      }

      res.render('upload',{
        stuName : $stuName,
        stuId : $stuId,
        times : $times
      });

    }else {
      res.render('index',{errorMsg : "通行证输入错误"});
    }
  });

  app.post('/upload',uploadController.dataInput);
  // app.post('/upload',function (req,res,next) {
  //   console.log(req);
  //   req.end();
  // })

  app.get('/home',function (req,res,next) {
    res.writeHead(302,{
      'Location':'http://www.improvecfan.cn'
    });
    res.end();
  });

  app.get('/check',function (req,res,next) {
    res.render('check');
  });

}
