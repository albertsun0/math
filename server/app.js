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


let answers = [1,1,1,1,1,1,1,1,1,1,1,1];
let questions = ["1","2","3","4","5","6","7","8","9","10","11","12"];

io.on("connection", (socket) => {
  console.log("New client connected");
  
  let userInfo = {};

  socket.on("join", (data) => {
    data.solved = 2;
    data.inGame = gameStarted ? false : true;
    data.ready = false;
    userInfo = data;
    users.push(data);
    io.emit("joined", data);
    socket.emit("joinSuccess", data);
    io.emit("users", users);
    console.log(users);
    sendGlobalMessage(io, data.name + " joined", data.color);
  })

  socket.on("startGame", () => {
    //assume game is allowed to be started?? ex players ready
    gameStarted = true;
    gameUsers = [...users];

  })

  socket.on("submit", ({questionID, answer}) => {
    if(answers[questionID] = answer){
      //if got last question right
      if(questionID == numQuestions-1){
        socket.emit("correct", {question:-1})
      }
      else{
        socket.emit("correct", {question:questions[questionID+1]})
      }
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