import React from 'react'

function GameView() {
  return (
    <div className="bg-gray-700 p-6 rounded-lg w-7/12 flex flex-col space-y-8 ">
        <div className = "flex-row flex items-center">
            <div className = "w-1/12 overflow-clip mr-2 text-white">
                player1
            </div>
            <div className = "grow">
                <div className = "h-8 bg-red-500 w-8/12 rounded-lg">

                </div>
            </div>
        </div>
        <div className = "flex-row flex items-center">
            <div className = "w-1/12 overflow-clip mr-2 text-white">
                player2
            </div>
            <div className = "grow">
                <div className = "h-8 bg-green-600 w-6/12 rounded-lg">

                </div>
            </div>
        </div>
        <div className = "flex-row flex items-center">
            <div className = "w-1/12 overflow-clip mr-2 text-white">
                You
            </div>
            <div className = "grow">
                <div className = "h-8 bg-purple-500 w-10/12 rounded-lg">

                </div>
            </div>
        </div>
        
    </div>
  )
}

export default GameView