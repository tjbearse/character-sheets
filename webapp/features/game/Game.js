import React from 'react';
import {
	BrowserRouter as Router,
	Link,
	Redirect,
	Route,
	Switch,
	useParams,
	useRouteMatch,
} from 'react-router-dom';

import FTDRequestContainer from '../forTheDungeon/FTDRequestContainer'
import FTDGMContainer from '../forTheDungeon/FTDGMContainer'
import {EditGameContainer, NewGameContainer} from './EditGame'

export default function Games() {
	let { path, url } = useRouteMatch();
	return (
		<Switch>
			<Route exact path={path}>
				<h2>Games</h2>
				<ul>
					<li><Link to={`${url}/new`}>New</Link></li>
					<li><Link to={`${url}/g/G1`}>G1</Link></li>
					<li><Link to={`${url}/g/G2`}>G2</Link></li>
				</ul>
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
					<GMView />
				</Route>
				<Route path={`${path}/sheet`}>
					<Sheet />
				</Route>
				<Route path={`${path}/edit`}>
					<EditGameContainer />
				</Route>
			</Switch>
		</div>
	)
}

function Sheet() {
	// TODO pass down gameID
	return (
		<FTDRequestContainer/>
	)
}

function GMView() {
	return (
		<FTDGMContainer />
	)
}
