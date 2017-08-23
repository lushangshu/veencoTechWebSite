
$(function () {
    $('#modify').on("click", function () {
          //登出请求

          var title = $('#inputTitle').val();
          var comment = $('#inputComment').val();
          var content = $('#inputSubject').val();
          var obj = {
              title: title,
              comment: comment,
              content:content
          };
          console.log(title+' '+comment+' '+content);
          //登录请求
          var ajax = $.ajax({
              type: 'POST',
              url: 'in/modifyClientInfo',
              dataType: 'json',
              data: obj,
              timeout:5000,
              success:function(data){
                console.log('succeed ' + data.title);
                alert('修改成功');
              },
              error:function(err){
                console.log('fail with error' + err.status);
                alert('修改失败'+err.status);
                //console.log('fail with error' + util.inspect(err, false, null))
              }
            });
          });
  });
