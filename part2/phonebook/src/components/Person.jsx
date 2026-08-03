const Person = ({ data: person, onDelete }) => {
    return (
        <>
            <span>{person.name} {person.number}</span> 
            <button onClick={() => onDelete(person.id)}>delete</button><br />
        </>
    )
}

export default Person