import Person from './Person'

const People = ({ data: people, handleDelete }) => {
    return people.map(person => (
        <Person key={person.id} data={person} handleDelete={handleDelete} />
    ))
}

export default People