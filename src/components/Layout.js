import Search from './Search'
import Status from './Status'

const Layout = ({ state, update, loading, anagrams }) => {
    return(
        <section className="hero is-fullheight is-bold is-warning">
            <div className="hero-body">
                <div className="container is-pulled-left">
                <h1 className="title">
                        The Anagramer
                    </h1>
                    <h2 className="subtitle">
                        Find anagrams ... like really fast :)
                    </h2>
                    <Search 
                        query={state.word} 
                        handleChange={update}
                    />
                    <p>
                        <em>
                            Lost? Try <strong>team</strong> or <strong>aamrl</strong>.
                        </em>
                    </p>
                </div>
                <div className="container is-pulled-right">
                    <Status anagrams={anagrams}/>
                </div>
            </div>
        </section>
    )
}

export default Layout