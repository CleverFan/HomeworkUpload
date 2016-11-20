/**
 * Created by chengfan on 2016/11/19.
 */
var fs = require('fs');

function mkdir (pos, dirArray,_callback){
    var len = dirArray.length;
    console.log(len);
    if( pos >= len || pos > 10){
        _callback();
        return;
    }
    var currentDir = '';
    for(var i= 0; i <=pos; i++){
        if(i!=0)currentDir+='/';
        currentDir += dirArray[i];
    }
    fs.exists(currentDir,function(exists){
        if(!exists){
            fs.mkdir(currentDir,function(err){
                if(err){
                    console.log('创建文件夹出错！');
                }else{
                    console.log(currentDir+'文件夹-创建成功！');
                    mkdir(pos+1,dirArray,_callback);
                }
            });
        }else{
            console.log(currentDir+'文件夹-已存在！');
            mkdir(pos+1,dirArray,_callback);
        }
    });
}

module.exports = {
    //创建目录结构
    mkdirs : function (dirpath,_callback) {
        var dirArray = dirpath.split('/');
        fs.exists( dirpath ,function(exists){
            if(!exists){
                mkdir(0, dirArray,function(){
                    console.log('文件夹创建完毕!准备写入文件!');
                    _callback();
                });
            }else{
                console.log('文件夹已经存在!准备写入文件!');
                _callback();
            }
        });
    }
}