import React from 'react'

function UserList({userList, colors}) {
  return (
    <div className = "w-1/6 bg-gray-700 p-6 text-white flex-col space-y-2 rounded-md">
        <div className="text-2xl">Players</div>
        {userList.map((user, i) => {
        return <div className = "bg-gray-600 p-2 rounded" style = {{'color' : colors[user.color]}} key = {i}>
            {user.name}
        </div>
        })}
    </div>
  )
}

export default UserList