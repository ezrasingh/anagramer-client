import { Component } from 'react'
// GraphQL bindings
import { Query } from 'react-apollo'
import { getAnagrams } from '../graphql/queries.gql'
//Components
import Layout from '../components/Layout'

class UI extends Component{
    state = { word : "" }
    updateQuery(event){
        this.setState({ query: event.target.value })
    }
    actions = {
        update: this.updateQuery.bind(this)
    }
    render(){
        return(
            <Query 
                query={getAnagrams} 
                variables={this.state}
            >
                {( { loading, error, data } ) => {
                    if(error) { 
                        console.error(error) 
                    }
                    return <Layout
                                loading={loading} 
                                anagrams={data}
                                actions={this.actions}
                                state={this.state}
                            />
                }}
            </Query>
        )
    }
}

export default UI