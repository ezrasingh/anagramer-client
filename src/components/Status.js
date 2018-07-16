
/** Alphabetize with respect to second letter */
function alphabetize(words){
    function compare(cur, next){
        // List of cur and next omitting first character
        const sub_words = [cur, next].map(word => word.substring(1))
        const [ cur_word, next_word ] = sub_words
        // Return priority of sub word 
        return cur_word.localeCompare(next_word)
    }
    return words.sort(compare)
}

const Status = ({ anagrams }) => {
    return(
        <div className="status box">
            <div className="container">
                {
                    anagrams && anagrams.length ? 
                        <div className="animated fadeInUp tags">
                            {alphabetize(anagrams).map((anagram, id) => {
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