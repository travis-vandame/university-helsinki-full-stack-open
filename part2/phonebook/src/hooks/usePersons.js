import { useState, useEffect } from 'react'
import personService from '../services/person'

const usePersons = () => {
    const [persons, setPersons] = useState([])
    const [searchFilter, setSearchFilter] = useState('')
    const [formData, setFormData] = useState({ name: '', number: '' })

    useEffect(() => {
        personService
        .get()
        .then(response => setPersons(response))
        .catch(error => alert(`failed to load persons`))
    }, [])

    const handleSearchFilter = (event) => setSearchFilter(event.target.value)
    
    const handleFormChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value })

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

    const filteredPersons = persons.filter(person => !searchFilter || person.name.toLowerCase().includes(searchFilter.toLowerCase()))

  return {
    // State
    persons,
    filteredPersons,
    searchFilter,
    formData,
    setPersons,         // for updatePerson or removePerson
    setSearchFilter,    // for searchFilter
    setFormData,        // for createPerson or updatePerson
    // Handlers
    createPerson,       // event => void
    updatePerson,       // (id, personData) => void
    removePerson,       // (id) => void
    // Derived/Computed
    handleFormChange,
    handleSearchFilter,
    //filteredPersons // compute this in the hook and return it, or return persons + searchFilter and let App filter. Returning it pre-computed is cleaner since filtering is App-specific logic.
  }
}

export default usePersons