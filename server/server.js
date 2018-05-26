const path=require('path');
const express=require('express');
const http=require('http');

const port=process.env.PORT||3000;
const {generateLocationMessage}=require('./utils/message.js');

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
    from:"admin",
    text:"welcome to chat app"
  });

  socket.broadcast.emit('newMessageEvent',{
    from:"admin",
    text:"new user joined"
  });
  socket.on('createMessageEvent',(messag)=>{
    console.log("new message is ",messag.text);
    io.emit('newMessageEvent',{
      from: messag.from,
      text:messag.text,
      createdAt: new Date().getTime()
    });
  });
  socket.on('createLocationMessage',(location)=>{
    io.emit('newLocationMessage',generateLocationMessage('admin',location.latitude,location.longitude));
  });
});


server.listen(port,()=>{
  console.log(`hey server is up at ${port}`);
});
