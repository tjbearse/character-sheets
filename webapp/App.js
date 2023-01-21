import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams,
	useRouteMatch,
} from 'react-router-dom';
import Games from './features/game/Games'

export default function App() {
	return (
		<Router >
			<div>
				<nav>
					<ul>
						<li>
							<Link to="/games">Games</Link>
						</li>
					</ul>
				</nav>

				<Switch>
					<Route path="/games">
						<Games/>
					</Route>
				</Switch>
			</div>
		</Router>
	);
}
