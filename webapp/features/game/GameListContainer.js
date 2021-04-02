import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { selectAllGames, fetchGames } from './gamesSlice'
import {
	Link,
	useRouteMatch,
} from 'react-router-dom'

export default function GameListContainer() {
	let { path, url } = useRouteMatch();

	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchGames());
	}, []);
	const games = useSelector(selectAllGames)

	return (
		<ul>
			{
				games.map(g =>
					<li key={g._id}>
						<Link to={`${url}/g/${g._id}`}>{g.name} </Link>
					</li>
				)
			}
		</ul>
	)
}
