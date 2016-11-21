/**
 * Created by chengfan on 2016/11/18.
 */
var email = require('../config.js').email;
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: email.host,
    service:'qq',
    secureConnection: true, // use SSL
    auth: {
        user: email.user,
        pass: email.password
    }
});

/**
 * 发送邮件
 * @param contents
 */
module.exports = function (contents,toUser) {
    transporter.sendMail({
        from: email.user,
        to: toUser,
        subject: email.subject,
        text: contents
    }, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.response);
        }

        transporter.close(); // 如果没用，关闭连接池
    });
};