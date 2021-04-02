import React, { useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectAllSheets, updateSheet, fetchSheetsForGame} from '../sheet/sheetsSlice'
import FTDSheet from '../forTheDungeon/FTDSheet'

// FIXME this needs to be my sheets specifically
const makeSheetsForGame = (gameId) =>
	(state) => selectAllSheets(state).filter(s => s.gameId == gameId)


export default function MySheet({ gameId }) {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchSheetsForGame(gameId));
	}, []);

	const sheetSelector = useMemo(() => makeSheetsForGame(gameId), [gameId])
	const sheets = useSelector(sheetSelector)


	if (sheets.length) {
		const sheet = sheets[0]
		function saveSheet(patch) {
			console.log('save patch', patch)
			dispatch(updateSheet(patch))
		}
		return (<FTDSheet
			sheet={sheet}
			save={saveSheet}
		/>)
	} else {
		// FIXME separate loading from none
		// idea: add to game or make gameId -> sheet map
		// no key / undefined => not fetched
		// [] => no sheets
		return 'loading or none...'
	}
}
