import React from 'react'

function Square({value, onPress, row, col}) {

    const toggle = () => {
        onPress?.(row,col);
    }

    return (
        <div onClick={toggle} className={`tile ${value ? "on":"off"}`}>
            
        </div>
    )
}

export default Square
