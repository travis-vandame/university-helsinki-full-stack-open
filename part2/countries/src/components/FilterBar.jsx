const FilterBar = ({ filterText, handleTextChange }) => {
    return (
        <div>
            <form onSubmit={(event) => event.preventDefault()}>
                <label htmlFor="filterText">find countries</label>
                <input 
                    type="search" 
                    name="filterText" 
                    id="filterText" 
                    value={filterText}
                    onChange={handleTextChange} />                
            </form>
        </div>
    )
}

export default FilterBar