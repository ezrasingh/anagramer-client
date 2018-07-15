import 'cross-fetch/polyfill'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({
        uri: "/api"
    })
})

export default client
