import { useState } from 'react'

/**
const Header = ({ course }) => {
  console.log('Header course prop: ', course)
  return(
    <h1>{course}</h1>
  )
}

const Part = ({ name, exercises }) => {
  console.log('Part props: ', name, exercises)
  return(
    <p>{name} {exercises}</p>    
  )
}

const Content = ({ parts }) => {
  console.log('Content parts prop: ', parts)
  return(
    <>
    {parts.map(({ name, exercises, id }) => (
      <Part key={id} name={name} exercises={exercises} />
    ))}
    </>
  )
}

const Total = ({ parts }) => {
  console.log('Total parts prop: ', parts)
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  console.log('Total of parts: ', total)
  return(
    <p>Number of exercises { total }</p>
  )
}

const Hello = ({ name, age }) => {
  const bornYear = () => {
    const yearNow = new Date().getFullYear()
    console.log('Hello component born year fired: ', yearNow)
    return yearNow - props.age
  }
  const name = props.name
  const age = props.age
  const { name, age } = props
  const bornYear = () => new Date().getFullYear() - age
  console.log('Hello props: ', name, age)
  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}
*/

/**
const Display = ({ counter }) => {
  return (
    <div>{counter}</div>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}
*/
const Display = ({ counter}) => <div>{counter}</div>
const Button = ({ onClick, text}) => <button onClick={onClick} text={text}>{text}</button>
const App = (props) => {
  // const {counter} = props
  /**
  setTimeout(() => setCounter(counter +1), 1000)
  
  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10, id: 0 },
      { name: 'Using props to pass data', exercises: 7, id: 1 },
      { name: 'State of a component', exercises: 14, id: 2 }
    ]
  }
  
  const name = 'Peter'
  const age = 10

  const handleClick = () => {
    console.log('clicked')
  }

  console.log('App Const course list: ', course)
  console.log('App Const name and ages: ', name, age)
  console.log('App props: ', props)
  console.log('App rendering...', counter)
  */

  const [ counter, setCounter ] = useState(0)
  console.log('rendering with counter value', counter)

  const increaseByOne = () => {
    console.log('increasing, value before', counter)
    setCounter(counter +1) 
  }
  const decreaseByOne = () => {
    console.log('decreasing, value before', counter)
    setCounter(counter -1)
  }
  const setToZero = () => {
    console.log('resetting to zero, value before', counter)
    setCounter(0)
  }

  return (
    <div>
      {/*
      <h1>Greetings</h1>
      <Hello name="Maya" age={26+10} />
      <Hello name={name} age={age} />
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      <button onClick={handleClick}>plus</button
      <button onClick={() => setCounter(counter + 1)}>plus</button>
      <button onClick={() => setCounter(0)}>zero</button>
      <button onClick={increaseByOne}>plus</button>
      */}

      {/** onClick for handling events and handleSomthing for functions */}
      <Display counter={counter} />
      <Button
        onClick={increaseByOne}
        text="plus"
      />
      <Button
        onClick={decreaseByOne}
        text='minus'
      />
      <Button 
        onClick={setToZero}
        text='zero' 
      />
    </div>
  )
}

export default App
