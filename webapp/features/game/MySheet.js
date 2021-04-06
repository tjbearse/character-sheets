import React, { useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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

import { selectSheetById, selectAllSheets, createSheet, updateSheet, fetchSheetsForGame} from '../sheet/sheetsSlice'
import FTDSheet from '../forTheDungeon/FTDSheet'

// FIXME this needs to be my sheets specifically
const makeSheetsForGame = (gameId) =>
	(state) => selectAllSheets(state).filter(s => s.gameId == gameId)


export default function MySheetsContainer({ gameId }) {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchSheetsForGame(gameId));
	}, []);

	const sheetSelector = useMemo(() => makeSheetsForGame(gameId), [gameId])
	const sheets = useSelector(sheetSelector)
	// FIXME separate loading from none
	// idea: add to game or make gameId -> sheet map
	// no key / undefined => not fetched
	// [] => no sheets

	return (
		<MySheets sheets={sheets} gameId={gameId} />
	)
}

function MySheets({ sheets, gameId }) {
	const dispatch = useDispatch()
	const history = useHistory();
	const { path, url } = useRouteMatch()

	const saveSheet = (patch) => dispatch(updateSheet(patch))
	const newSheet = (sheet) => {
		sheet = Object.assign({}, sheet, { gameId })
		return dispatch(createSheet(sheet))
			.then(({ payload: s }) =>
				history.push(`${url}/s/${s._id}`)
			)
	}

	return (
		<Switch>
			<Route exact path={path}>
				<h2>MySheets</h2>
				<Link to={`${url}/new`}>New</Link>
				<ul>
					{
						sheets.map(s =>
							<li key={s._id}>
								<Link to={`${url}/s/${s._id}`}>{s.name} </Link>
							</li>
						)
					}
				</ul>
			</Route>
			<Route path={`${path}/s/:sheetId`}>
				<SheetPage save={saveSheet} />
			</Route>
			<Route path={`${path}/new`}>
				<NewSheet save={newSheet} />
			</Route>
		</Switch>
	)
}

function SheetPage({ save }) {
	const dispatch = useDispatch()
	let { sheetId } = useParams();
	const sheet = useSelector(state => selectSheetById(state, sheetId))

	if (sheet) {
		return (<FTDSheet
			sheet={sheet}
			save={save}
		/>)
	} else {
		return 'not found'
	}
}

function NewSheet({ save }) {
	return (<FTDSheet
		sheet={{}}
		save={save}
	/>)
}
