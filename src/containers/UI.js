import { Component } from 'react'
// GraphQL bindings
import { Query } from 'react-apollo'
import { getAnagrams } from '../graphql/queries.gql'
//Components
import Layout from '../components/Layout'

class UI extends Component{
    state = { word : "" }
    updateQuery = event =>{
        this.setState({ word: event.target.value.toLowerCase() })
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
                                anagrams={data ? data.anagrams : []}
                                update={this.updateQuery}
                                state={this.state}
                            />
                }}
            </Query>
        )
    }
}

export default UI