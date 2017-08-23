window.onload = function(){
  //alert('hello world');
  var ajax = $.ajax({
      type: 'GET',
      url: 'in/requestClientInfo',
      dataType: 'json',
      timeout:5000,
      success:function(data){
        //alert('succeed ' + data.title +' '+ data.content);
        document.getElementById('client_title').innerHTML = data.title;
        document.getElementById('client_content').innerHTML = data.content;
        //alert('请求成功');
      },
      error:function(err){
        console.log('fail with error' + err);
        //alert('请求失败'+ err);
      }
    });
}
