
//var trylogin = require('../util/tryToLogin');
var uploadController = require('../util/uploadController');
var fs = require('fs');
var makedirUtil = require('../util/makeDirUtil');

var fileUtil = require('../util/fileUtil');

var config = require('../config');

module.exports = function (app) {

  var $times;
  var $stuName;
  var $stuId;
  var $stuEmail;
  var $remember;
  /* GET home page. */
  app.get('/', function(req, res, next) {
    //process.createDir('')
    //process.openApp();
    //res.end();
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

    if($pass == config.passport){
      var $rootPath =  config.uploadPath;
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
      'Location':config.homeUrl
    });
    res.end();
  });

  app.get('/check',function (req,res,next) {
    var filesList = fileUtil(config.uploadPath + $times+'/' + $stuName + "-" +$stuId);

    filesList.sort(sortHandler);


    var fileStr='';
    for(var i=0;i<filesList.length;i++) {
      var item = filesList[i];
      var desc ="文件名"+item.name /*+ " "
          +"大小:"+(item.size/1024).toFixed(2) +"/kb"+" "
          +"路径:"+item.path*/;
      fileStr+=desc;
    }

    res.render('check',{fileList : fileStr,times : $times , stuName : $stuName});
  });

  function sortHandler(a,b) {
    if(a.size > b.size)
      return -1;
    else if(a.size < b.size) return 1
    return 0;
  }

}
