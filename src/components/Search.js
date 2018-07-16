
const Search = ({ query, handleChange }) => {
    return(
        <div className="field">
            <div className="control">
                <input
                    className="input is-large"
                    value={query}
                    onChange={handleChange}
                    placeholder="Enter any word to get started..."
                />
            </div>
        </div>
    )
}

export default Search