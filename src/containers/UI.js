import { Component } from 'react'
// Components
import Search from '../components/Search'
import Status from '../components/Status'

class UI extends Component{
    state = { query: "" }
    updateQuery(event){
        this.setState({ query: event.target.value })
    }
    render(){
        const { query } = this.state
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
                            handleChange={this.updateQuery.bind(this)}
                        />
                    </div>
                    <div className="container is-pulled-right">
                    <Status anagrams={anagrams}/>
                    </div>
                </div>
            </section>
        )
    }
}

export default UI