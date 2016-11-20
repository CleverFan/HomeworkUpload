/**
 * Created by chengfan on 2016/11/20.
 */

//var trylogin = require('../util/tryToLogin');
var uploadController = require('../util/uploadController');
var fs = require('fs');
var makedirUtil = require('../util/makeDirUtil');

var fileUtil = require('../util/fileUtil');

//var process = require('../util/process')

module.exports = function (app) {

    /* GET home page. */
    app.get('/admin/show', function(req, res, next) {

        res.render('admin/show');
    });

}
