import React from 'react'
import UserList from './UserList'
import GameView from './GameView'

function Game({colors, messageList, handleKeyDown, sendMessage, userList}) {
  return (
    <div className="w-screen h-screen bg-gray-900 flex flex-row p-4">

    <UserList userList = {userList} colors = {colors}></UserList>

   <div className = "grow flex flex-col items-center py-10">
        <GameView></GameView>
   </div>
 
</div> 
  )
}

export default Game