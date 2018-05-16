var socket= io();
socket.on('connect',function(){
  console.log("connected to server");
});
socket.on('disconnect',function(){
  console.log("disconnected from server");
});
socket.on('newMessageEvent',function(email){
  console.log("new message received",email);
  var li=$('<li></li>');
  li.text(`${email.from}:${email.text}`);
  $('#messages').append(li); 
});

$(document).ready(function(){
  $('#messageform').on('submit',function(e){
    e.preventDefault();
  //
  // $("#new").html("Hello, World!");
  socket.emit('createMessageEvent',{
    from:'user',
    text:$("[name='message']").val()

  },function(){

  });
  });
});
