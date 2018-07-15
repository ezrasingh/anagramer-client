/** Application Entry Point */
import { render } from 'react-dom'
import UI from './containers/UI'
// Redux
import { ApolloProvider } from 'react-apollo'
import client from './client'
// Styling
import './styles/core.scss'
// Utils
import * as serviceWorker from './serviceWorker'

const App = (
	<ApolloProvider client={client}>
		<UI/>
	</ApolloProvider>
)

const root = document.getElementById('app-root')

if(process.env.NODE_ENV !== 'production'){
	// Development specific features
}

render(App, root)

serviceWorker.register()
