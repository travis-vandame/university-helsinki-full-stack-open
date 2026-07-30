import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>
const Button = ({ onClick, text }) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}
const StatisticLine = ({ text, value }) => {
  return <tr><td>{text}</td><td>{value}</td></tr>
}

const Statistics = ({ statistics }) => {
  const isEmpty = Object.values(statistics).every(val => val === 0)
  const totalClicks = Object.values(statistics).reduce((sum, v) => sum + v, 0)
  const average = (statistics.good - statistics.bad) / totalClicks
  const positivePercentage = (statistics.good / totalClicks) * 100
  
  if (isEmpty) return <div><span>No feedback given</span></div>

  return (
    <table>
      <caption></caption>
      <thead></thead>
      <tbody>
        <StatisticLine text='good' value={statistics.good} />
        <StatisticLine text='neutral' value={statistics.neutral} />
        <StatisticLine text='bad' value={statistics.bad} />
        <StatisticLine text='all' value={totalClicks} />
        <StatisticLine text='average' value={average} />
        <StatisticLine text='positive' value={`${positivePercentage} %`} />
      </tbody>
    </table>
  )
}

const App = (props) => {
  const [isDebug, setIsDebug] = useState(true)
  const [feedbackClicks, setFeedbackClicks] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })

  isDebug && console.log('App props', props)
  isDebug && console.log('Feedback Clicks:', feedbackClicks)

  const handleFeedbackGood = () => {
    const newFeedback = {
      ...feedbackClicks,
      good: feedbackClicks.good + 1,
    }
    isDebug && console.log('Feedback Good Before:', feedbackClicks.good)
    setFeedbackClicks(newFeedback)
    isDebug && console.log('Feedback Good After:', newFeedback.good)
  }

  const handleFeedbackNeutral = () => {
    const newFeedback = {
      ...feedbackClicks,
      neutral: feedbackClicks.neutral + 1,
    }
    isDebug && console.log('Feedback Neutral Before:', feedbackClicks.neutral)
    setFeedbackClicks(newFeedback)
    isDebug && console.log('Feedback Neutral After', newFeedback.neutral)
  }

  const handleFeedBackBad = () => {
    const newFeedBack = {
      ...feedbackClicks,
      bad: feedbackClicks.bad + 1
    }
    isDebug && console.log('Feedback Bad Before:', feedbackClicks.bad)
    setFeedbackClicks(newFeedBack)
    isDebug && console.log('Feedback Bad After', newFeedBack.bad)
  }

  return (
    <div>
      <Header text='give feedback' />
      <Button onClick={handleFeedbackGood} text='good' />
      <Button onClick={handleFeedbackNeutral} text='neutral' />
      <Button onClick={handleFeedBackBad} text='bad' />
      <Header text='statistics' />
      <Statistics statistics={feedbackClicks} />
    </div>
  )
}

export default App
