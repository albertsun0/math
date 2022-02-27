import React from 'react'

function Login({sendLogin, colors, select, selectedColor}) {
  return (
    <div className="w-full h-screen bg-gray-900 grid items-center align-middle text-gray-300">
        <div className="flex flex-col items-center">
          <div className="text-2xl mb-4">Enter a Name</div>
          <input type={"text"} className="p-2 rounded-lg bg-gray-300 hover:bg-white transition-all duration-300 mb-2 text-black" id="name"></input>
          <div className="text-2xl mb-4">Choose a Color</div>
          <div className="flex flex-row items-center">
            {colors.map((c, i) => {
              let w = (i === selectedColor) ? 40 : 30;
              return <div 
                      className="rounded-md ml-2 transition-all" 
                      style={{"backgroundColor" : c, "width" : w, "height" : w}}
                      onClick={() => select(i)}
                      key = {i}
                    ></div>
            })}
          </div>
          <button className="p-1 px-3 rounded text-xl mt-4 bg-gray-700" onClick={sendLogin}>Enter</button>
        </div>
      </div>
  )
}

export default Login