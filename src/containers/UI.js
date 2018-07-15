import { Component } from 'react'
// GraphQL bindings
import { Query } from 'react-apollo'
import getAnagrams from '../graphql/queries.gql'
//Components
import Layout from '../components/Layout'

class UI extends Component{
    state = { query: "" }
    updateQuery(event){
        this.setState({ query: event.target.value })
    }
    render(){
        const actions = {
            update: this.updateQuery.bind(this)
        }
        return(
            <Query 
                query={getAnagrams} 
                variables={{ word: this.state.query }}
            >
                {( { loading, error, data } ) => {
                    if(error){
                        console.error(error)
                    }
                    return <Layout
                                loading={loading} 
                                anagrams={data}
                                actions={actions}
                                state={this.state}
                            />
                }}
            </Query>
        )
    }
}

export default UI