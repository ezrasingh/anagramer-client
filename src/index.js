/** Application Entry Point */
import { render } from 'react-dom'
import UI from './containers/UI'
// Redux
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import app from './app'
// Styling
import './styles/core.scss'
// Utils
import * as serviceWorker from './serviceWorker'

const App = (
	<Provider store={createStore(app)}>
		<UI/>
	</Provider>
)

const root = document.getElementById('app-root')

if(process.env.NODE_ENV !== 'production'){
	// Development specific features
}

render(App, root)

serviceWorker.register()
