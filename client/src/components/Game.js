import React from 'react'
import UserList from './UserList'
import GameView from './GameView'

function Game({colors, userList, gameStart, user, ready, toggleReady, start, question, handleKeyDown, rank}) {
  return (
  <div className="w-screen h-screen bg-gray-900 flex flex-col p-4 items-center">

    {//<UserList userList = {userList} colors = {colors}></UserList>
    } 
    
    <div className='text-white text-2xl mt-10'>{gameStart ? "timer" : `${userList.length}/8 Waiting for Players...`}</div>
    <div className = "flex flex-col items-center py-10 w-full">
          <GameView userList = {userList} colors = {colors} currentUser = {user} gameStart = {gameStart}></GameView>
    </div>
    {gameStart? 
      <div className = "flex flex-col items-center space-y-10">
        {rank === 0 ? <div className = "flex flex-col items-center space-y-10">
            <div className = 'text-3xl text-white'>{question}</div>
            <input type = "text" className = "p-2 text-lg bg-gray-300 rounded-xl" id="input" onKeyDown = {handleKeyDown}></input>
          </div>:
          <div className = "flex flex-col items-center space-y-10">
            <div className = "text-2xl text-white">{`You Placed ${rank}${rank >3 ? "th" : ""}${rank == 2 ? "nd" : ""}${rank == 1 ? "st" : ""}${rank == 3 ? "rd" : ""}`}</div>
            <div className = "text-xl text-white">Waiting for next game...</div>
          </div>
        }
        
      </div> 
   
        :
        <div className = 'p-10'>
        <button className = {`${ready ? "bg-green-400" : "bg-red-400"} text-white p-2 px-4 rounded-xl`} onClick = {toggleReady}>
          {ready ? "Unready":"Ready"}
        </button>
        <button className = "bg-green-400 text-white p-2 px-4 rounded-xl" onClick = {start}>
          Start Game
        </button>
      </div>
    }
 
  </div> 
  )
}

export default Game