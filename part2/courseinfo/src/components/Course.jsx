const Header = ({ course }) => {
    return <h2>{course.name}</h2>
}

const Part = ({ name, exercises }) => {
  return <p>{name} {exercises}</p>
}

const Content = ({ course }) => {
    const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0)
    
    return (
        <>
        {course.parts.map(part => 
            <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
        <p><b>total of {totalExercises} exercises</b></p>
        </>
    )
}

const Course = ({ course }) => {
    return (
        <>
            <Header course={course} />
            <Content course={course} />
        </>
    )
}

export default Course