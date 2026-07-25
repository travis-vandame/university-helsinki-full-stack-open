const Header = ({ course }) => {
  console.log('Header course prop: ', course)
  return(
    <h1>{course}</h1>
  )
}

const Part = ({ name, exercises }) => {
  console.log('Part prop: ', name, exercises)
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

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10, id: 0 },
      { name: 'Using props to pass data', exercises: 7, id: 1 },
      { name: 'State of a component', exercises: 14, id: 2 }
    ]
  }
  console.log('App course list: ', course)
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
