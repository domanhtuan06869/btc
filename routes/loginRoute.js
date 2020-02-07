var express = require('express');
var router = express.Router();
var config = require('config');
var Cryptojs = require("crypto-js"); //Toanva add
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
var Cryptojs = require("crypto-js");

const {
    MessengerClient
} = require('messaging-api-messenger');
const {
    MessengerBatch
} = require('messaging-api-messenger');
const PAGE_ACCESS_TOKEN = (process.env.MESSENGER_PAGE_ACCESS_TOKEN) ?
    (process.env.MESSENGER_PAGE_ACCESS_TOKEN) :
    config.get('pageAccessToken');
const fbclient = MessengerClient.connect({
    accessToken: PAGE_ACCESS_TOKEN,
    version: '3.1',
});
const SALT = (process.env.SALT) ?
    (process.env.SALT) :
    config.get('salt');

const URL_HOME = (process.env.URL_HOME) ?
    (process.env.URL_HOME):
    config.get('serverURL');
var database = require('../object/database');

passport.use(new LocalStrategy(
    function (username, password, done) {
        database.getConnection(client => {
            database.findMemberBTC({
                _id: username
            }, client, function (ret) {
                if (typeof (ret) == 'string') {
                    return done(ret);
                }
                if (!ret || ret.length != 1) {
                    return done(null, false, {
                        message: 'Incorrect username.'
                    });
                }
                if (ret[0].password != password) {
                    return done(null, false, {
                        message: 'Incorrect username.'
                    });
                }
                req.session.cookie.maxAge = 12 * 60 * 60 * 1000;
                req.session.Name = ret[0].Name;
                req.session.psid = ret[0]._id;
                req.session.Provincial = ret[0].Provincial;
                req.session.GeoCodeProvincial = ret[0].GeoCodeProvincial;
                req.session.Type = ret[0].Type;
                req.session.ViewType = ret[0].Type;
                req.session.Team = ret[0].Team;
                req.session.TeamId = ret[0].TeamId;
                req.session.IsAdmin = ret[0].IsAdmin;
                req.session.admin = true;
                console.log("session.admin", req.session.admin);
                req.session.faceUser = true;
                return done(null, user);
                
            });
        })

    }
));
router.get('/login',function(req,res){
    res.sendFile('login.html', {
        root: "views/cms"
    });
})
router.get('/authorizePassword', function (req, res) {
    res.sendFile('authorizePassword.html', {
        root: "views/cms"
    });
})
router.post('/login',passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);

router.post('/changePass/:Id',function(req,res){
    var getRndInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    var id =req.params.Id;
    var otp =  getRndInteger(100000, 999999);
    var password=req.body.password;
    var query={
        _id:id
    }
    database.getConnection(client=>{
        var data = {
            _id: id,
            password: Cryptojs.MD5(password + SALT).toString(),
            OTP: otp,
            BlockStatus: 'PENDING'
        }
        database.updateBtcOtpPass(query, data, client, function (ret1) {
            res.send({
                success: true
            })
            fbclient.sendButtonTemplate(id, `Bạn đã gửi yêu cầu cập nhật mật khẩu, để hoàn thành hãy chọn kích hoạt.`, [{
                type: 'web_url',
                title: 'kích hoạt',
                url: `${URL_HOME}/authorizePassword?otp=${otp}&psid=${id}`,
            }])
        })
    });
    
});
router.post('/authpass',(req,res)=>{
    var psid=req.body.psid;
    var otp= req.body.otp;
    var query={
        _id:psid,
        OTP:Number(otp),
        BlockStatus:"PENDING"
    }
    database.getConnection(client=>{
        database.findBTCOTP(query, client, function (results){
            if (!results || results.length != 1) {
                return res.send({
                    success:false,
                    err: results
                })
            }else{
                let result=results[0];
                var objUpdate={
                    Password:result.password,
                    BlockStatus:'ACTIVE'
                }
                database.updateBtcOtpPass(query,objUpdate,client,function(err2,ret2){
                    if(err2){
                        return res.send({
                            success: false,
                            err: err2
                        })
                    }else{
                        return res.send({
                            success: true,
                            err: null
                        })
                    }
                })
            }
        })
    })
});
module.exports = router;