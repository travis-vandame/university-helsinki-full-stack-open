import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'
import PhonebookList from './components/PhonebookList'

const App = (props) => {
  const [persons, setPersons] = useState([])
  const [searchFilter, setSearchFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleSearchFilter = (event) => {
    setSearchFilter(event.target.value)
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addEntry = (event) => {
    event.preventDefault()
    
    if (!newName || !newNumber) {
      alert('please enter name and number')
      return
    }
    
    const nameExists = persons.some(p => p.name === newName)

    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const nameObject = {
      id: crypto.randomUUID(), 
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(nameObject))
  }

  const filteredPersons = persons.filter(person => !searchFilter || person.name.toLowerCase().includes(searchFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter onChange={handleSearchFilter} value={searchFilter} />
      <h2>add a new</h2>
      <PersonForm
        name={newName}
        handleNewName={handleNewName}
        number={newNumber}
        handleNewNumber={handleNewNumber}
        handleSubmit={addEntry} />
      <h2>Numbers</h2>
      <PhonebookList persons={filteredPersons} />
    </div>
  )
}

export default App 