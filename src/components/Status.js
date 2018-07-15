
const Status = ({ anagrams }) => {
    return(
        <div className="status box">
            <div className="container">
                {
                    anagrams && anagrams.length ? 
                        <div className="animated fadeInUp tags">
                            {anagrams.map((anagram, id) => {
                                return(
                                    <span 
                                        key={id.toString()} 
                                        className="tag is-medium is-info"
                                    >
                                        {anagram}
                                    </span>
                                )
                            })}
                        </div> :
                        <span className="animated fadeInUp tag is-danger is-medium">
                            No anagrams found.
                        </span>
                }
            </div>
        </div>
    )
}

export default Status