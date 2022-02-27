const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });

let users = [];

io.on("connection", (socket) => {
  console.log("New client connected");
  
  let userInfo = {};

  socket.on("join", (data) => {
    userInfo = data;
    users.push(data);
    io.emit("joined", data);
    socket.emit("joinSuccess", data);
    io.emit("users", users);
    console.log(users);
    sendGlobalMessage(io, data.name + " joined", data.color);
  })

  socket.on("sendMessage", ({name, color, message}) => {
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    let data = {
      hasUser:true, 
      user: {name:name, color:color},
      text: message,
      time: time,
    };

    console.log(data);
    io.emit("newMessage", data);
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected " + userInfo.name);
    if(index !== -1){
      console.log("a logged in user left");
      io.emit("leave" , userInfo);
      let index = users.indexOf(userInfo);
      users.splice(index, 1);
      console.log(users);
      io.emit("users", users);
      sendGlobalMessage(io, userInfo.name + " left", userInfo.color);
    }
  });
});

const sendGlobalMessage = (io, message, color) => {
  let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let data = {
      hasUser:false, 
      user: {name:"admin", color:color},
      text: message,
      time: time,
    };
    io.emit("newMessage", data);
}


server.listen(port, () => console.log(`Listening on port ${port}`));