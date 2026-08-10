const Notify = ({ messageText, type }) => {
    if (!messageText) return null

    return <div className={`notification ${type}`}>{messageText}</div>
}

export default Notify