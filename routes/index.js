var express = require('express');
var router = express.Router();
var trylogin = require('../util/tryToLogin');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login',function (req,res,next) {
  var $stuNum = req.body.stuNum;
  var $stuPass = req.body.stuPass;

  //trylogin($stuNum,$stuPass);
  trylogin({
    "user": 201426810303,
    "password": 950818
  });

  res.end();

});

router.get('/home',function (req,res,next) {
  res.writeHead(302,{
    'Location':'http://www.improvecfan.cn'
  });
  res.end();
});

router.get('/goany',function (req,res,next) {
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

module.exports = router;
