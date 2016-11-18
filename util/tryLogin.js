/**
 * Created by chengfan on 2016/11/18.
 */
var superagent = require('superagent');
var events = require("events");
var iconv = require('iconv-lite');

var emitter = new events.EventEmitter()
var cookie = [];

emitter.on("setCookeie", getName)            //监听setCookeie事件


function setCookeie (name,pass) {
    var $VIEWSTATE = "dDwtMTU2MDM2OTk5Nzt0PDtsPGk8MT47PjtsPHQ8O2w8aTwzPjtpPDEzPjs+O2w8dDw7bDxpPDE+O2k8Mz47aTw1PjtpPDc+O2k8OT47aTwxMT47aTwxMz47aTwxNT47aTwxNz47PjtsPHQ8cDxwPGw8QmFja0ltYWdlVXJsOz47bDxodHRwOi8vd3d3Lnljancuemp1dC5lZHUuY24vL2ltYWdlcy9iZy5naWY7Pj47Pjs7Pjt0PHA8cDxsPEJhY2tJbWFnZVVybDs+O2w8aHR0cDovL3d3dy55Y2p3LnpqdXQuZWR1LmNuLy9pbWFnZXMvYmcxLmdpZjs+Pjs+Ozs+O3Q8cDxwPGw8QmFja0ltYWdlVXJsOz47bDxodHRwOi8vd3d3Lnljancuemp1dC5lZHUuY24vL2ltYWdlcy9iZzEuZ2lmOz4+Oz47Oz47dDxwPHA8bDxCYWNrSW1hZ2VVcmw7PjtsPGh0dHA6Ly93d3cueWNqdy56anV0LmVkdS5jbi8vaW1hZ2VzL2JnMS5naWY7Pj47Pjs7Pjt0PHA8cDxsPEJhY2tJbWFnZVVybDs+O2w8aHR0cDovL3d3dy55Y2p3LnpqdXQuZWR1LmNuLy9pbWFnZXMvYmcxLmdpZjs+Pjs+Ozs+O3Q8cDxwPGw8QmFja0ltYWdlVXJsOz47bDxodHRwOi8vd3d3Lnljancuemp1dC5lZHUuY24vL2ltYWdlcy9iZzEuZ2lmOz4+Oz47Oz47dDxwPHA8bDxCYWNrSW1hZ2VVcmw7PjtsPGh0dHA6Ly93d3cueWNqdy56anV0LmVkdS5jbi8vaW1hZ2VzL2JnMS5naWY7Pj47Pjs7Pjt0PHA8cDxsPEJhY2tJbWFnZVVybDs+O2w8aHR0cDovL3d3dy55Y2p3LnpqdXQuZWR1LmNuLy9pbWFnZXMvYmcxLmdpZjs+Pjs+Ozs+O3Q8cDxwPGw8QmFja0ltYWdlVXJsOz47bDxodHRwOi8vd3d3Lnljancuemp1dC5lZHUuY24vL2ltYWdlcy9iZzEuZ2lmOz4+Oz47Oz47Pj47dDx0PDt0PGk8Mz47QDwtLeeUqOaIt+exu+Weiy0tO+aVmeW4iDvlrabnlJ87PjtAPC0t55So5oi357G75Z6LLS075pWZ5biIO+WtpueUnzs+PjtsPGk8Mj47Pj47Oz47Pj47Pj47bDxJbWdfREw7Pj7R/HqOM3/HB4sDvzwvPi6m+iKfoA=="

    superagent.post('http://www.ycjw.zjut.edu.cn/logon.aspx')  //学校里的一个论坛，这是登录提交地址
        .type("form")
        //.set({Connection:"keep-alive"})
        //.header({status:"302"})
        //.header({'User-Agent':'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.76 Mobile Safari/537.36'})
        //.header({'Upgrade-Insecure-Requests':'1'})
        .send({"__EVENTTARGET":""})
        .send({"__EVENTARGUMENT":""})                                                                                       //这肯定不是我真的用户名和密码啦
        .send({"__VIEWSTATE":$VIEWSTATE})
        .send({"Cbo_LX":"学生"})
        .send({"Txt_UserName":"201426810303"})
        .send({"Txt_Password":"950818"})
        .send({'Img_DL.x':"28"})
        .send({'Img_DL.y':"9"})
        .redirects(0)
        .end(function(err, res){
            if (err) {
                console.log(err.message);
                throw err;
            }
            cookie = res.header['set-cookie']             //从response中得到cookie
            //if(res.header['StatusCode'] == "302"){
                emitter.emit("setCookeie", cookie);
            //}
            console.log(res);
        })
}

function getName (cookie) {
    console.log(cookie[0].split(';')[0]);
    superagent.get("http://www.ycjw.zjut.edu.cn//stdgl/stdgl_index.aspx")             //随便论坛里的一个地址
        .set("Cookie", cookie[0])
        //.set("Cookie", cookie[1])
        .set({'User-Agent':'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.76 Mobile Safari/537.36'})
        .set({Connection:"keep-alive"})
        .pipe(iconv.decodeStream('gbk'))//在resquest中设置得到的cookie，只设置第四个足以（具体情况具体分析）
        .collect(function(err, body) {
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
            var $html = body;
            $html = $html.split("<font color=\"White\" size=\"2\">");
            $html = $html[1].split("</font>");
            if ($html[0] == "用户:未登陆"){
                console.log("用户:未登陆");
                return
            }
            $html = $html[0].split("(");
            $html = $html[1].split(")");
            console.log($html[0]);
         })
};

module.exports = setCookeie;