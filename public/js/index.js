var socket= io();
socket.on('connect',function(){
  console.log("connected to server");
});
socket.on('disconnect',function(){
  console.log("disconnected from server");
});
socket.on('newMessageEvent',function(email){
  console.log("new message received",email);
});
socket.emit('createMessageEvent',{
  text:"hey how are you"
});
