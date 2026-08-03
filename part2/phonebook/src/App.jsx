// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import personService from './services/person'
import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import usePersons from './hooks/usePersons'

const App = (props) => {
  // const [persons, setPersons] = useState([])
  // const [searchFilter, setSearchFilter] = useState('')
  // const [formData, setFormData] = useState({ name: '', number: '' })
  
  /*
  useEffect(() => {
    personService
      .get()
      .then(response => setPersons(response))
      .catch(error => alert(`failed to load persons`))
  }, [])

  const handleSearchFilter = (event) => setSearchFilter(event.target.value)
  const handleFormChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value })
  */
  /*
  const createPerson = (event) => {
    event.preventDefault()
    
    const newPerson = {
      name: formData.name,
      number: formData.number
    }

    const personFound = persons.find(p => 
      p.name.toLowerCase() === formData.name.toLowerCase()
    )

    if (personFound) {
      const confirmed = window.confirm(
        `${newPerson.name} is already added to phonebook. Replace the old number with a new one?`
      )

      if (confirmed) {
        updatePerson(personFound.id, newPerson)
      }

      return
    }

    personService
      .create(newPerson)
      .then(returnPerson => {
        setPersons([...persons, returnPerson])
        setFormData({ name: '', number: '' })
      })
      .catch(error => {
        alert('error adding person')
      })
  }

  const updatePerson = (id, personData) => {
    return personService
      .update(id, personData)
      .then(returnPerson => {
        setPersons(persons.map(p =>
          p.id === id ? returnPerson : p
        ))
        setFormData({ name: '', number: ''})
      })
      .catch(() => alert(`update failed`))
  }

  const removePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (!person) return

    const confirmed = window.confirm(`Delete ${person.name} ?`)
    if (!confirmed) return

    personService
      .remove(id)
      .then(returnData => {
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
        alert(`delete failed`)
      })
  }

  const filteredPersons = persons.filter(person => 
    !searchFilter || person.name.toLowerCase().includes(searchFilter.toLowerCase()))
  */
 
  const {
    filteredPersons,
    searchFilter,
    setSearchFilter,
    formData,
    setFormData,
    handleFormChange,
    handleSearchFilter,
    createPerson,
    updatePerson,
    removePerson
  } = usePersons()

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter 
        onChange={handleSearchFilter} 
        value={searchFilter} 
      />
      <h2>add a new</h2>
      <PersonForm
        formData={formData}
        handleFormChange={handleFormChange}
        handleSubmit={createPerson} 
      />
      <h2>Numbers</h2>
      <PersonList 
        data={filteredPersons} 
        onDelete={removePerson}
      />
    </div>
  )
}

export default App 