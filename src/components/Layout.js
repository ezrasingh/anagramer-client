import Search from './Search'
import Status from './Status'

const Layout = ({ state, actions, loading, anagrams }) => {
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
                        query={state.query} 
                        handleChange={actions.update}
                    />
                </div>
                <div className="container is-pulled-right">
                    <Status anagrams={anagrams}/>
                </div>
            </div>
        </section>
    )
}

export default Layout