const Notification = ({ message, type }) => {
    if (message === null) return

    return <div className={`notification ${type}`}>{message}</div>
}
export default Notification