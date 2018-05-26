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
socket.on('newLocationMessage',function(message){
  var li=$('<li></li>');
  var a=$('<a target="_blank">my current location</a>');

  li.text(`${message.from}:`);
  a.attr('href',message.url);
  li.append(a);
  $('#messages').append(li);
});

$(document).ready(function(){
  $('#messageform').on('submit',function(e){
    e.preventDefault();
  socket.emit('createMessageEvent',{
    from:'user',
    text:$("[name='message']").val()
  },function(){
  });
  });

  $('#location').on('click',function(){
    if (!navigator.geolocation){
      return alert('geolocation not supported by the browser');
    }

    navigator.geolocation.getCurrentPosition(function(position){
      socket.emit('createLocationMessage',{
        latitude:position.coords.latitude,
        longitude:position.coords.longitude
      })
    },function(){
      alert('sorry cant fetch your location,check settings of browser');
    });
  });


});
