
const Status = ({ anagrams }) => {
    <div className="box">
        <div className="container has-text-centered">
            {
                anagrams.size ? 
                    <div classname="tags">
                        {anagrams.map((anagram, id) => {
                            return(
                                <div key={id.toString()} className="tag">
                                    {anagram}
                                </div>
                            )
                        })}
                    </div> :
                    'No anagrams found.'
            }
        </div>
    </div>
}

export default Status