/**
 * Created by chengfan on 2016/11/20.
 */
var process = require('child_process');
//直接调用命令
exports.createDir = function (command){process.exec(command,
    function (error, stdout, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
}
//调用执行文件
exports.openApp = function(){
    process.exec('bpcs_uploader.php quota',
        function (error,stdout,stderr) {
            if (error !== null) {
                console.log('exec error: ' + error.code);
            }
            console.log(stdout);
        });
}