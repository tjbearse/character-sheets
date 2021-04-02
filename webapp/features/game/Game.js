import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	BrowserRouter as Router,
	Link,
	Redirect,
	Route,
	Switch,
	useParams,
	useRouteMatch,
} from 'react-router-dom'

import {EditGameContainer} from './EditGame'
import GameListContainer from './GameListContainer'
import MySheet from './MySheet'
import GameSheets from './GameSheets'


import { selectGameById, updateGame } from './gamesSlice'

export default function GamePage() {
	let { gameId } = useParams();
	const game = useSelector(state => selectGameById(state, gameId))
	const dispatch = useDispatch()

	const dispatchUpdate = (game)=> dispatch(updateGame(game))

	return (
		<Game game={game} updateGame={dispatchUpdate} />
	)
}

function Game({ game, updateGame }) {
	let { path, url } = useRouteMatch();

	const isGM = false;

	if (!game) {
		// TODO are we loading?
		return 'loading?'
	}

	return (
		<div>
			<h2> Game {game.name} </h2>
			<ul>
				<li><Link to={`${url}/all`}>All Sheets</Link></li>
				<li><Link to={`${url}/sheet`}>My Sheet(s)</Link></li>
				<li><Link to={`${url}/edit`}>Edit Game</Link></li>
			</ul>
			<Switch>
				<Route exact path={path}>
					{ isGM ? <Redirect to={`${url}/all`} /> : <Redirect to={`${url}/sheet`} />}
				</Route>
				<Route path={`${path}/all`}>
					{ /* TODO pass down sheets */ }
					<GameSheets gameId={game._id} />
				</Route>
				<Route path={`${path}/sheet`}>
					{ /* TODO pass down sheet */ }
					<MySheet gameId={game._id} />
				</Route>
				<Route path={`${path}/edit`}>
					{ /* TODO pass down game */ }
					<EditGameContainer game={game} save={updateGame} />
				</Route>
			</Switch>
		</div>
	)
}
