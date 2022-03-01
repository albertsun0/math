import React from 'react'

function GameView({userList, colors, currentUser, gameStart}) {
  return (
    <div className="bg-gray-700 p-6 rounded-lg w-8/12 flex flex-col space-y-8 ">
        {userList.map((user, i) => {
        return <div className = "flex-row flex items-center" key={i}>
                <div className = "w-1/12 overflow-clip mr-2" style = {{color:colors[user.color]}}>{`${user.name} ${user.name === currentUser ? " (You)" : ""}`}</div>
                
                <div className = "grow">
                {gameStart?
                <div className = "h-8 rounded-lg w-1/12 transition-all duration-500 flex flex-row-reverse items-center" style={{width:`${user.solved*100/12}%`, backgroundColor:colors[user.color]}}>
                  <div className = "text-white mr-2">
                  {user.solved > 0 ? `${user.solved}/12` : ""}
                  </div>
                  
                </div>
                :
                <div className = {`${user.ready ? "text-green-400" : "text-gray-500"}`}>
                  {user.ready ? "Ready" : "Not Ready"}
                </div>
                }
                    
                </div>
            </div>
        })}
    </div>
  )
}

export default GameView