import React, { useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectAllSheets, updateSheet, fetchSheetsForGame} from '../sheet/sheetsSlice'
import FTDSheet from '../forTheDungeon/FTDSheet'

const makeSheetsForGame = (gameId) =>
	(state) => selectAllSheets(state).filter(s => s.gameId == gameId)


export default function GameSheets({ gameId }) {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchSheetsForGame(gameId));
	}, []);

	const sheetSelector = useMemo(() => makeSheetsForGame(gameId), [gameId])
	const sheets = useSelector(sheetSelector)

	if (sheets.length) {
		return (
			<div>
			{
				sheets.map(sheet =>
					<FTDSheet
						key={sheet._id}
						readOnly={true}
						sheet={sheet}
					/>
				)
			}
			</div>
		)
	} else {
		return 'loading or none...'
	}
}
