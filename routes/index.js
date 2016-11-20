
//var trylogin = require('../util/tryToLogin');
var uploadController = require('../util/uploadController');
var fs = require('fs');
var makedirUtil = require('../util/makeDirUtil');

module.exports = function (app) {

  var $times;
  var $stuName;
  var $stuId;
  var $stuEmail;
  var $remember;
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
    $stuEmail = req.body.stuEmail;
    $remember = req.body.remember;

    var $pass = req.body.pass;

    if($pass == "bianyiyuanli"){
      var $rootPath =  './public/uploads/';
      var $path = $rootPath + $times+'/'+$stuName+'-'+$stuId;

      if (!fs.existsSync($path)){
        makedirUtil.mkdirs($path,function () {
          console.log('ok')
        });
      }

      res.render('upload',{
        stuName : $stuName,
        stuId : $stuId,
        times : $times,
        stuEmail : $stuEmail,
        pass : $pass,
        remember : $remember
      });

      console.log(1);

    }else {
      res.render('index',{errorMsg : "通行证输入错误"});
    }
  });

  app.post('/upload',uploadController.dataInput);

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
