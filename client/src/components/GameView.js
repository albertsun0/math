import React from 'react'

function GameView({userList, colors}) {
  return (
    <div className="bg-gray-700 p-6 rounded-lg w-8/12 flex flex-col space-y-8 ">
        {userList.map((user, i) => {
        return <div className = "flex-row flex items-center" key={i}>
                <div className = "w-1/12 overflow-clip mr-2 text-white">{user.name}</div>
                <div className = "grow">
                    <div className = "h-8 rounded-lg w-1/12 transition-all duration-500" style={{width:`${user.solved*100/12}%`, backgroundColor:colors[user.color]}}>

                    </div>
                </div>
            </div>
        })}
    </div>
  )
}

export default GameView