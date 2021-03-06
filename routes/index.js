var express = require('express');
var utility = require('utility');
var vd = require('../dataFile.json');
var crypto = require('crypto');
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/usersql');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);
var router = express.Router();
// 响应一个JSON数据
var responseJSON = function (res, ret) {
     if(typeof ret === 'undefined') {
          res.json({
               code:'-200',
               msg: '操作失败'
        });
    } else {
      res.json(ret);
}};
// 添加用户
router.get('/wx',function(req,res,next){
  var signature = req.query.signature;
  var timestamp = req.query.timestamp;
  var nonce = req.query.nonce;
  var echostr = req.query.echostr;
  var token = 'weixin';

  /*  加密/校验流程如下： */
  //1. 将token、timestamp、nonce三个参数进行字典序排序
  var array = new Array(token,timestamp,nonce);
  array.sort();
  var str = array.toString().replace(/,/g,"");

  //2. 将三个参数字符串拼接成一个字符串进行sha1加密
  var sha1Code = crypto.createHash("sha1");
  var code = sha1Code.update(str,'utf-8').digest("hex");

  //3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
  if(code===signature){
      res.send(echostr)
  }else{
      res.send("error");
  }
});

router.get('/addUser', function(req, res, next){
 // 从连接池获取连接
 console.log('1');
  pool.getConnection(function(err, connection) {
  // 获取前台页面传过来的参数
  if(err){
    console.log(err);
  }else{
    console.log('2');
    var param = req.query || req.params;
    // 建立连接 增加一个用户信息
    connection.query(userSQL.insert, [param.uid,param.name,param.password], function(err, result) {
      console.log('3');
          if(result) {
               result = {
                        code: 200,
                       msg:'增加成功'
               };
          }

       // 以json形式，把操作结果返回给前台页面
         responseJSON(res, result);
       // 释放连接
        connection.release();

         });
  }
  });
 });

 router.post('/in/modifyClientInfo',function(req,res,next){
   console.log('准备修改客户信息'+req.body.title+' '+req.body.content);

   pool.getConnection(function(err, connection) {
       connection.query(userSQL.getCurrentClientInfo,function(err,rows,result){
         if(err){
           response = {
               status:'0',
           };
           console.log(err);
           res.send(response);
           res.end();
           connection.release();
         }else{
           console.log('jinru xiugai ' + rows[0].id);

           connection.query(userSQL.changeClientInfo, [rows[0].id+1,req.body.title,req.body.comment,req.body.content,'5','6'], function(err,rows,result) {
             response = {
                 status:'',
                 title:req.body.title,
                 comment:req.body.comment,
                 content:req.body.content
             };
             if(err){
               response.status='0';
               console.log('shujuku '+ err);
               //throw err;
             }
             else{
                response.status='1';
                 console.log('修改成功');
               //res.send(obj);
           }
           console.log(response);
           res.send(response);
           res.end();
           connection.release();
         });
         }
       });
   });
 });

router.get('/in/requestClientInfo',function(req,res,next){
    console.log('准备获取客户信息');
    pool.getConnection(function(err, connection) {
      connection.query(userSQL.getCurrentClientInfo,function(err,rows,result){

        if(err){
          console.log('err'+err);
          var response = {
            status:'0',
          };
          res.send(response);
        }else{
          var response = {
              status:'1',
              title:rows[0].title,
              comment:rows[0].comment,
              content:rows[0].content
          };
          console.log('success with '+rows[0].id);
          res.send(response);
        }
        //res.end();
        connection.release();
      });
    });
});


/* GET home page. */
router.get('/',function(req, res, next) {
    var tiTle = '用户登录';
    console.log('session is '+ req.session);
    if(req.session.user!=null){
      console.log('session user is '+ req.session.user);
      tiTle = req.session.user;
    }
    res.render('index',
    {
      title: tiTle
    });
});

module.exports = router;
