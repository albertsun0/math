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

const gameLen = 180;
const numQuestions = 12;
const maxPlayers = 8;

let users = [];
let gameStarted = false;
let gameUsers = [];
let rank = 1;

let answers = [1,1,1,1,1,1,1,1,1,1,1,1];
let questions = ["1","2","3","4","5","6","7","8","9","10","11","12"];

io.on("connection", (socket) => {
  console.log("New client connected");
  
  let userInfo = {};
  
  socket.on("join", (data) => {
    data.solved = 0;
    data.inGame = gameStarted ? false : true;
    data.ready = false;
    userInfo = data;
    users.push(userInfo);
    io.emit("joined", data);
    socket.emit("joinSuccess", data);
    io.emit("users", users);
    io.emit("gameState", gameStarted);
    console.log(users);
    sendGlobalMessage(io, data.name + " joined", data.color);
  })

  socket.on("ready", () => {
    userInfo.ready = !userInfo.ready;
    io.emit("users", users);
    socket.emit("setReady", userInfo.ready);
  })

  socket.on("startGame", () => {
    //assume game is allowed to be started?? ex players ready
    gameStarted = true;
    io.emit("gameStart");
    io.emit("question", {question:questions[0]});
  })

  socket.on("submit", ({answer}) => {
    if(answers[userInfo.solved] == answer){
      //if got last question right
      if(userInfo.solved == numQuestions-1){
        socket.emit("correct", {question:"win", rank:rank})
        rank++;
        userInfo.solved++;
      }
      else{
        userInfo.solved++;
        socket.emit("correct", {question:questions[userInfo.solved]})
        
      }
      io.emit("users", users);
    }
    else{
      socket.emit("incorrect")
    }
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
    let index = users.indexOf(userInfo);
    if(index !== -1){
      console.log("a logged in user left");
      io.emit("leave" , userInfo);
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