$(function(){
  $('#logOff').on('click', function () {
        //登出请求
        console.log('log off button click');
        $.ajax({
            type: 'GET',
            url: '/login/logoff',
            dataType: 'json',
            //data: obj
            success:function(data){
              window.location.href = '/';
            },
            error:function(err){
              console.log('登出失败，请重试！');
            }
          });
  });

  $('#requestToken').on('click',function(){
      console.log('请求Access Token');
      var ajax = $.ajax({
          type: 'POST',
          url: '/login/requestAccessToken',
          dataType: 'json',
          data: obj,
          timeout:5000,
          success:function(data){
            console.log('succeed' + data);
            window.location.href = '/';
          },
          error:function(err){
            console.log('fail with error' + err.status);
            //console.log('fail with error' + util.inspect(err, false, null))
          }
        });
  });

  $('#logIn').on('click',function(){
    var Username = $('#username').val();
    var Password = $('#password').val();
    var obj = {
        username: Username,
        password: Password
    };
    //登录请求
    var ajax = $.ajax({
        type: 'POST',
        url: '/login/login_submit',
        dataType: 'json',
        data: obj,
        timeout:5000,
        success:function(data){
          console.log('succeed' + data);
          window.location.href = '/';
        },
        error:function(err){
          console.log('fail with error' + err.status);
          //console.log('fail with error' + util.inspect(err, false, null))
        }
      });
    });

});
