import { useState } from 'react'

/*
// function that retruns a function
const hello = (who) => {
  const handler = () => {
    console.log('hello world', who)
  }
  return handler
}

const hello = (who) => {
  return () => {
    console.log('hello', who)
  }
}
*/
const hello = (who) => () => {
  console.log('hello', who)
}

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = (props) => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [value, setValue] = useState(10)

  const setToValue = (newValue) => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  /*
  const setToValue = (newValue) => () => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  const [total, setTotal] = useState(0)
  
  console.log('rendering with all clicks value', allClicks)
  console.log('total', total)
  */

  const handleLeftClick = () => {
    // don't use push it will mutate the allClicks directly
    setAll(allClicks.concat('L'))
    setLeft(left +1)
    /*
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft + left)
    */
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R')) // // don't use push it will mutate the allClicks directly
    setRight(right +1)
    /*
    const updatedRight = right +1
    setRight(updatedRight)
    setTotal(updatedRight + right)
    */
  }
  /**
  const [clicks, setClicks] = useState({
    left: 0, 
    right: 0
  })

  const handleLeftClick = () => {
    const newClicks = {
      left: clicks.left + 1,
      right: clicks.right
    }
    setClicks(newClicks)
  }

  const handleRightClick = () => {
    const newClicks = {
      left: clicks.left,
      right: clicks.right + 1
    }
    setClicks(newClicks)
  }

  const handleLeftClick = () => {
    const newClicks = {
      ...clicks,
      left: clicks.left + 1
    }
    console.log('increasing, left value before', clicks.left)
    setClicks(newClicks)
  }

  const handleRightClick = () => {
    const newClicks = {
        ...clicks,
        right: clicks.right + 1
    }
    console.log('increasing, right value before', clicks.right)
    setClicks(newClicks)
  }

  const handleLeftClick =() => setClicks({...clicks, left: clicks.left +1})
  const handleRightClick = () => setClicks({...clicks, right: clicks.right +1})
  */

  return (
    <div>
      {/* 
      {left}
      <button onClick={() => setLeft(left +1)} > 
        left
      </button>
      <button onClick={() => setRight(right +1)} >
        right
      </button>
      {right}
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <p>{allClicks.join(' ')}</p>
      <p>Total {total}</p>

      <button onClick={hello('world')}>button</button>
      <button onClick={hello('react')}>button</button>
      <button onClick={hello('function')}>button</button>

      <button onClick={setToValue(1000)}>thousand</button>
      <button onClick={setToValue(0)}>reset</button> 
      <button onClick={setToValue(value + 1)}>increment</button>
      
      <button onClick={() => setToValue(1000)}>thousand</button>
      <button onClick={() => setToValue(0)}>reset</button>
      <button onClick={() => setToValue(value + 1)}>increment</button>
      */}
      {left}
      <Button onClick={handleLeftClick} text='left' />
      <Button onClick={handleRightClick} text='right' />
      {right}
      <Button onClick={() => setToValue(1000)} text='thousand' />
      <Button onClick={() => setToValue(0)} text='reset' />
      <Button onClick={() => setToValue(value + 1)} text='increment' />

      <History allClicks={allClicks} />
    </div>
  )
}

export default App
