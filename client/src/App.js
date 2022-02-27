import React, { useState, useEffect } from "react";
import {SocketContext, socket} from './socket';
import './index.css';
import './user.css';
import Login from "./components/Login";
import Game from "./components/Game";
//import { all } from "../../server/routes";
//import Square from "./Square";
/*

message 
{
  hasUser: boolean,
  message: string,
  user = { name, color}
  
}
*/
function App() {
  const [loggedIn, toggleLoggedIn] = useState(false);
  const [selectedColor, selectColor] = useState(0);
  const [user, setUser] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [userList, setUserList] = useState([]);
  
  
  const colors = ['#ec7b7b', '#88ec7b', '#7b8cec', '#e87bec', '#ecea7b'];
  useEffect(() => {
    socket.on("joinSuccess", data => {
      console.log(data);
      setUser(data.name);
      selectColor(data.color);
      toggleLoggedIn(true);
    })
    
    socket.on("users" , data => {
      console.log(data);
      setUserList(data);
      
    })

    socket.on("joined" , data => {
      console.log(data.name + " joined");

      // let temp = userList;
      // temp.push(data);
      // setUserList(temp);
    })

    socket.on("leave", data => {
      console.log(data.name + " left");
    })

    socket.on("newMessage", data => {
      console.log(data);
      
      setMessageList(messageList => [...messageList, data]);
      console.log(messageList);
    })

    return () => socket.disconnect();
  }, []);

  // const sendToggle = () =>{
  //   socket.emit('Sendtoggle', toggle);
  // }

  // const toggleTile = (r,c) => {
  //   console.log(r + " " +c);
  //   socket.emit('UpdateSquare', {r:r,c:c});
  // }

  const sendMessage = () => {
    let message = document.getElementById('messsage').value;
    if(message !== ""){
      socket.emit("sendMessage", {name:user, color:selectedColor, message:message});
      document.getElementById('messsage').value = "";
    }
  }

  const sendLogin = () => {
    let name = document.getElementById('name').value;
    if(name !== ""){
      socket.emit("join", {name:name, color:selectedColor});
      document.getElementById('name').value = "";
    }
  }

  const select = (val) => {
    selectColor(val);
  }
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }
  return (
    <div>
      {loggedIn ? <Game colors={colors} messageList={messageList} handleKeyDown={handleKeyDown} sendMessage={sendMessage} userList = {userList}></Game>
      : 
      <Login sendLogin={sendLogin} colors={colors} select={select} selectedColor={selectedColor}></Login>
      }
    </div>
    
  );
}

export default App;