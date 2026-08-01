const PersonForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>name: <input onChange={props.handleNewName} value={props.name} /></div>
            <div>number: <input onChange={props.handleNewNumber} value={props.number} /></div>
            <div><button type="submit">add</button></div>
        </form>
    )
}

export default PersonForm