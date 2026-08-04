import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import usePersons from './hooks/usePersons'

const App = () => { 
  const {
    filteredPersons,
    searchFilter,
    formData,
    setSearchFilter,
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
        data={formData}
        handleFormChange={handleFormChange}
        handleSubmit={createPerson} 
      />
      <h2>Numbers</h2>
      <PersonList 
        data={filteredPersons} 
        handleDelete={removePerson}
      />
    </div>
  )
}

export default App 