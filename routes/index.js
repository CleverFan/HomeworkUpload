
//var trylogin = require('../util/tryToLogin');
var uploadController = require('../util/uploadController');


module.exports = function (app) {

  var $stuName;
  var $stuId;
  /* GET home page. */
  app.get('/', function(req, res, next) {
    res.render('index');
  });

  app.post('/login',function (req,res,next) {
    $stuName = req.body.stuName;
    $stuId = req.body.stuId;
    var $pass = req.body.pass;



    res.render('upload',{
      stuName : $stuName,
      stuId : $stuId
    });



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

  app.get('/goany',function (req,res,next) {
    var url = [
      'http://www.baidu.com',
      'http://www.improvecfan.cn',
      'http://blog.improvecfan.cn',
      'https://github.com',
      'https://github.com/CleverFan',
      'http://blog.csdn.net/qq_31655965',
      'https://www.google.com.hk/?gws_rd=ssl',
      'http://www.htmleaf.com/',
      'https://www.zhihu.com',
      'http://www.runoob.com/nodejs/nodejs-tutorial.html'
    ]
    var randomNum = parseInt(10*Math.random());
    res.writeHead(302,{
      'Location': url[randomNum]
    });
    res.end();
  });

}
