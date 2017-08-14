var express = require('express');
var utility = require('utility');
var vd = require('../dataFile.json');
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/usersql');
var util = require('util');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);
var router = express.Router();
/* GET home page. */

var tiTle = 'login';
var name = '';

var responseJSON = function (res, ret) {
     if(typeof ret === 'undefined') {
          res.json({
               code:'-200',
               msg: '操作失败'
        });
    } else {
      res.json(ret);
}};

router.post('/login_submit',function(req,res,next){
  console.log(req.body);
  pool.getConnection(function(err, connection) {
      connection.query(userSQL.checkUserAndPwd, [req.body.username,req.body.password], function(err,rows,result) {
        if(err){
        console.log(err);
        throw err;
        }
        else{
          var obj = {};
          if(rows[0]) {
            console.log('success')
            req.session.userName = req.body.username;
            req.session.isLogin = true;
            //tiTle = req.session.userName;
            obj = {
              "success":true,
              "id":1,
              "status":2
            };
          }else{
            console.log('fail s1');
            var text = 'txt';
            obj = {
              "success":false,
              "id":2,
              "status":3
            };
          }
          res.send(obj);
      }
      connection.release();
      });
    });
});

router.get('/logoff',function(req,res,next){
  tiTle = 'login';
  req.session.userName = null;
  req.session.isLogin = false;
  res.json({success:1});
  res.end();
});
//
router.get('/',function(req,res,next){
  res.render('login',{
    title:req.session.userName,
    isLogin:req.session.isLogin,
    name:req.session.userName
  });

});


module.exports = router;
