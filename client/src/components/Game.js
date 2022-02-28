import React from 'react'
import UserList from './UserList'
import GameView from './GameView'

function Game({colors, userList}) {
  return (
  <div className="w-screen h-screen bg-gray-900 flex flex-col p-4 items-center">

    {//<UserList userList = {userList} colors = {colors}></UserList>
    } 

    <div className='text-white text-2xl mt-10'>{`${userList.length}/8 Waiting for Players...`}</div>
    <div className = "grow flex flex-col items-center py-10 w-full">
          <GameView userList = {userList} colors = {colors}></GameView>
    </div>
 
  </div> 
  )
}

export default Game