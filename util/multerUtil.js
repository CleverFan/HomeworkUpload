/**
 * Created by chengfan on 2016/11/17.
 */
var  multer=require('multer');

var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
        var $path = './public/uploads/'+req.query.times+'/'+req.query.stuName+'-'+req.query.stuId;
        console.log("upload ing");

        cb(null, $path)

    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        //cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
        cb(null, fileFormat[0] + "." + fileFormat[fileFormat.length - 1]);
        console.log("upload ok")
    }
});
//添加配置文件到muler对象。
var upload = multer({
    storage: storage
});

//如需其他设置，请参考multer的limits,使用方法如下。
//var upload = multer({
//    storage: storage,
//    limits:{}
// });

//导出对象
module.exports = upload;