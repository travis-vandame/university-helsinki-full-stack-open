import Person from './Person'

const PersonList = ({ data: persons, handleDelete }) => {
    return persons.map(person => 
        <Person key={person.id} data={person} handleDelete={handleDelete} />
    )
}

export default PersonList