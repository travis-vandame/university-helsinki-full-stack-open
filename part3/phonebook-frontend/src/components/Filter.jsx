const Filter = ({ onChange, value }) => {
    return (
        <>
            <label htmlFor="filter">filter shown with</label>
            <input id="filter" name="filter" type="filter" 
                onChange={onChange} value={value} /> 
        </>
    )
}

export default Filter