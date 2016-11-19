/**
 * Created by chengfan on 2016/11/17.
 */
var muilter = require('./multerUtil');
//multer有single()中的名称必须是表单上传字段的name名称。
var upload=muilter.any('files');
exports.dataInput = function (req, res) {
    //console.log(req.query);
    upload(req, res, function (err) {
        //console.log(req.body.stuName+"222");
        //添加错误处理
        if (err) {
            return  console.log(err);
        }
        //文件信息在req.file或者req.files中显示。
        console.log(req.files);
    });
}