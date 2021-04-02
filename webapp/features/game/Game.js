import React from 'react'
import { useSelector } from 'react-redux'
import {
	BrowserRouter as Router,
	Link,
	Redirect,
	Route,
	Switch,
	useParams,
	useRouteMatch,
} from 'react-router-dom'

import {EditGameContainer, NewGameContainer} from './EditGame'
import GameListContainer from './GameListContainer'
import MySheet from './MySheet'
import GameSheets from './GameSheets'

export default function Games() {
	const { path, url } = useRouteMatch();
	return (
		<Switch>
			<Route exact path={path}>
				<h2>Games</h2>
				<Link to={`${url}/new`}>New</Link>
				<GameListContainer />
			</Route>
			<Route path={`${path}/new`}>
				<NewGameContainer />
			</Route>
			<Route path={`${path}/g/:gameId`}>
				<Game />
			</Route>
		</Switch>
	)
}

function Game() {
	let { path, url } = useRouteMatch();
	let { gameId } = useParams();

	// TODO get game info if not had

	const isGM = false;

	return (
		<div>
			<h2> Game {gameId} </h2>
			<ul>
				<li><Link to={`${url}/all`}>All Sheets</Link></li>
				<li><Link to={`${url}/sheet`}>My Sheet</Link></li>
				<li><Link to={`${url}/edit`}>Edit Game</Link></li>
			</ul>
			<Switch>
				<Route exact path={path}>
					{ isGM ? <Redirect to={`${url}/all`} /> : <Redirect to={`${url}/sheet`} />}
				</Route>
				<Route path={`${path}/all`}>
					<GMView gameId={gameId} />
				</Route>
				<Route path={`${path}/sheet`}>
					<MySheet gameId={gameId} />
				</Route>
				<Route path={`${path}/edit`}>
					<EditGameContainer gameId={gameId} />
				</Route>
			</Switch>
		</div>
	)
}

function GMView({ gameId }) {
	return (
		<GameSheets gameId={gameId} />
	)
}
