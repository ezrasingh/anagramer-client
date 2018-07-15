import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const endpoint = 
    process.env.NODE_ENV !== 'production' ?
        'http://localhost:5001/api' :
        '/api'

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({
        uri: endpoint
    })
})

export default client
