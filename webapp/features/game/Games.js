import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
	BrowserRouter as Router,
	Link,
	Redirect,
	Route,
	Switch,
	useHistory,
	useParams,
	useRouteMatch,
} from 'react-router-dom'

import { selectAllGames, fetchGames, createGame } from './gamesSlice'
import {NewGameContainer} from './EditGame'
import GamePage from './Game'


export default function GamesPage() {
	let { path, url } = useRouteMatch();

	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchGames());
	}, []);
	const games = useSelector(selectAllGames)

	return (
		<Games games={games} />
	)
}


export function Games({ games }) {
	const dispatch = useDispatch();
	const { path, url } = useRouteMatch()
	const history = useHistory();
	let { gameId } = useParams();

	const dispatchCreateGame = (game) => {
		dispatch(createGame(game)).then(({payload: g}) => {
			// redirect to new game
			history.push(`${url}/g/${g._id}`)
		})
	}

	return (
		<Switch>
			<Route exact path={path}>
				<h2>Games</h2>
				<Link to={`${url}/new`}>New</Link>
				<ul>
					{
						games.map(g =>
							<li key={g._id}>
								<Link to={`${url}/g/${g._id}`}>{g.name} </Link>
							</li>
						)
					}
				</ul>
			</Route>
			<Route path={`${path}/new`}>
				<NewGameContainer createGame={dispatchCreateGame}/>
			</Route>
			<Route path={`${path}/g/:gameId`}>
				<GamePage />
			</Route>
		</Switch>
	)
}
