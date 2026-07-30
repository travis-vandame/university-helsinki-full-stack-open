import { useState } from 'react'

const Heading = ({ text }) => {
  return <h1>{text}</h1>
}

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>
}

const Span = ({ text }) => {
  return <span>{text}</span>
}
 
const Anecdotes = ({ selected, ...props}) => {
  const mostVotedIndex = props.votes.indexOf(Math.max(...props.votes))
  
  return (
    <>
      <Heading text="Anecdote of the day" />
      <Span text={props.anecdotes[selected]} /><br />
      <Span text={`Has ${props.votes[selected]} votes`} /><br />
      <Button text="vote" onClick={props.handleVote} />
      <Button onClick={props.handleRandom} text="next anecdote" />
      <Heading text="Anecdote with the most votes" />
      <Span text={props.anecdotes[mostVotedIndex]} /><br />
      <Span text={`Has ${props.votes[mostVotedIndex]} votes`} />
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(
    Array(anecdotes.length).fill(0)
  )

  const handleRandom = () => {
    let randomIndex
    
    // Ensure we display a new anecdote
    do {
      randomIndex = Math.floor(Math.random() * anecdotes.length)
    } while (randomIndex === selected)
    setSelected(randomIndex)
  }

  const handleVote = () => {
    const copy = [...votes]

    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <Anecdotes 
      anecdotes={anecdotes}
      votes={votes}
      selected={selected}
      handleVote={handleVote} 
      handleRandom={handleRandom} />
  )
}

export default App
