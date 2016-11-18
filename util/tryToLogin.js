/**
 * Created by chengfan on 2016/11/18.
 */

var request = require('superagent');
var charset = require('superagent-charset')
charset(request)
var sendEmail = require('./sendEmail');

var headers = {
    'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Origin': 'http://www.ycjw.zjut.edu.cn',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Referer':'http://www.ycjw.zjut.edu.cn/logon.aspx',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.6,en;q=0.4,sr;q=0.2',
    'Host':'www.ycjw.zjut.edu.cn',
    'Cache-Control':'max-age=0',
    'Upgrade-Insecure-Requests':'1',
    Connection:'keep-alive'
};

var origin = 'http://www.ycjw.zjut.edu.cn',
    urls = {
        login: origin + '//Logon.aspx',
        index: origin + '//stdgl/stdgl_index.aspx'
    };


/**
 * 自动签到
 * @param account {object}
 * @constructor
 */
function GetName(account) {
    this.account = account;

    this.cookie = {
        value: null,
        expires: null
    };

    this.init();
}

GetName.prototype = {
    constructor: GetName,

    init: function () {
        var that = this;

        that.checkIn(function () {
            sendEmail(that.account.user + '，huoqu。 ' + new Date());
            console.log('======', '签到完毕，' + that.account.user, '======');
        });
    },

    // 验证登录，如果凭证没过期，无需重新验证
    _verify: function (cb) {
        Date.now() > this.cookie.expires ? this._login(cb) : cb(this.cookie);
    },

    // 登录
    _login: function (cb) {

        var that = this;
        var ck ;

        request.get('https://mail.zjut.edu.cn/?q=login&code=1')
            .end(function (err,res) {
                ck = res.headers['set-cookie']
console.log(ck)
                that.cookie = {
                    value: ck,
                };
            });
        request
            .post('https://mail.zjut.edu.cn/user/?q=login.do')
            //.set(headers)
            .type('form')
            //.charset('gbk')
            .set("Cookie",that.cookie)
            .send({
                user:201426810303,
                password:'cf958181127',
                go:'/?q=base',
                referer:'/?q=login'
            })
            .redirects(0)
            // .pipe(iconv.decodeStream('gbk'))
            // .collect(function(err, body) {
            //     console.log(body)
            // })
            .end(function (err,res) {
                if(err){
                    //console.log(err)
                }
                var stutus = res.statusCode;
                //console.log(res.text);
                if(stutus == 302) {
                     ck = res.headers['set-cookie'];

                    that.cookie = {
                        value: ck,
                    };

                    cb(that.cookie);
                }
                return;
            });
    },

    // 获取名字
    checkIn: function (cb) {
        var that = this;

        that._verify(function (cookie) {
console.log(cookie)
            request
                .get('https://mail.zjut.edu.cn/?q=base')
                .set('Cookie', cookie.value)
                .set('Referer',"https://mail.zjut.edu.cn/user/?code=1")
                //.pipe(iconv.decodeStream('gbk'))//在resquest中设置得到的cookie，只设置第四个足以（具体情况具体分析）
                //.collect(function(err, body) {
                .end(function (err,res) {

                   // console.log(res.text);
                    //console.log(body);

                    // .end(function(err, res ){
                    //     if (err){
                    //         console.log('no');
                    //         throw err;
                    //     };
                    //
                    //     //var h = iconv.decode(res.text,'gb2312');
                    //     console.log(res);
                    //
                    //     //return h;
                    //     /*
                    //     // console.log(res.text);
                    //     var $html = res.text;
                    //     //$html = iconv.decode($html,'gb2312');
                    //     //<font color="White" size="2">用户:201426810303(程帆) 权限:学生</font>
                     var $html = res.text;
                    // $html = $html.split("<font color=\"White\" size=\"2\">");
                    // $html = $html[1].split("</font>");
                    // if ($html[0] == "用户:未登陆"){
                    //     console.log("用户:未登陆");
                    //     return
                    // }
                    // $html = $html[0].split("(");
                    // $html = $html[1].split(")");
                     console.log($html);
                })
        });
    }
};


module.exports = function (account) {
    return new GetName(account);
};

