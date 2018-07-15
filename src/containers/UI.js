import _ from 'lodash'
import { connect } from 'react-redux'
import { updateQuery } from '../actions'
// Components
import Search from '../components/Search'
import Status from '../components/Status'

const UI = ({ query, anagrams, update }) => {
    return(
        <section className="hero is-fullheight">
            <div className="hero-body">
                <div className="container is-pulled-left">
                    <h1 className="title">
                        The Anagramer
                    </h1>
                    <h2 className="subtitle">
                        Find anagrams ... like really fast.
                    </h2>
                    <Search 
                        query={query} 
                        handleChange={update}
                    />
                </div>
                <div className="container is-pulled-right">
                    <Status anagrams={anagrams}/>
                </div>
            </div>
        </section>
    )
}

const mapStateToProps = state => {
    return { ...state }
}

const mapDispatchToProps = dispatch => {
    return { 
        update: (event) => {
            _.flowRight(
                dispatch,
                updateQuery
            )(event.target.value)
        }
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(UI)