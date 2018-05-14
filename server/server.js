const path=require('path');
const express=require('express');
const http=require('http');

const port=process.env.PORT||3000;

var socketIO=require('socket.io');


var app=express();
var server=http.createServer(app);
socketIO.listen(server);

var io=socketIO(server);
var addr=path.join(__dirname,'../public');
app.use(express.static(addr));

io.on('connection',(socket)=>{
  console.log("new user connected");

  socket.on('disconnect',()=>{
    console.log("disconnected from client");
  });
  socket.emit('newMessageEvent',{
    from:"excelrock_mitesh@yahoo.com",
    text:"hey how are u"
  });
  socket.on('createMessageEvent',(message)=>{
    console.log("new message is ",message.text);
  });
});

server.listen(port,()=>{
  console.log(`hey server is up at ${port}`);
});
