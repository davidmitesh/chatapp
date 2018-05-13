const path=require('path');
const express=require('express');

var app=express();
const port=process.env.PORT||3000;

var addr=path.join(__dirname,'../public');

app.use(express.static(addr));

// app.get('/',(req,res)=>{
//   res.render(index.html);
// });

app.listen(port,()=>{
  console.log(`hey server is up at ${port}`);
});
