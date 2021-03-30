import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams,
	useRouteMatch,
} from 'react-router-dom';
import FTDRequestContainer from './features/forTheDungeon/FTDRequestContainer';

export default function App() {
	return (
		<Router>
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

function Games() {
	let { path, url } = useRouteMatch();
	return (
		<Switch>
			<Route exact path={path}>
				<h2>Games</h2>
				<ul>
					<li><Link to={`${url}/G1`}>G1</Link></li>
					<li><Link to={`${url}/G2`}>G2</Link></li>
				</ul>
			</Route>
			<Route path={`${path}/:gameId`}>
				<Game />
			</Route>
		</Switch>
	)
}

function Game() {
	let { path, url } = useRouteMatch();
	let { gameId } = useParams();

	return (
		<div>
			<h2> Game {gameId} </h2>
			<ul>
				<li><Link to={`${url}/gm`}>GM View</Link></li>
				<li><Link to={`${url}/sheet`}>Sheet</Link></li>
				<li><Link to={`${url}/edit`}>Edit</Link></li>
			</ul>
			<Switch>
				<Route exact path={path}>
				</Route>
				<Route path={`${path}/gm`}>
					<GMView />
				</Route>
				<Route path={`${path}/sheet`}>
					<Sheet />
				</Route>
				<Route path={`${path}/edit`}>
					<EditGame />
				</Route>
			</Switch>
		</div>
	)
}

function EditGame() {
	return "edit game"
}
function GMView() {
	return "GM view"
}
function Sheet() {
	return (
		<FTDRequestContainer/>
	)
}
