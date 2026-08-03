import Person from './Person'

const PersonList = ({ data: persons, onDelete }) => {
    return persons.map(person => <Person key={person.id} data={person} onDelete={onDelete} />)
}

export default PersonList