import React, {
	useEffect,
	useMemo,
	useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HashLink } from 'react-router-hash-link';
// hash link specifically needed for scrolling to anchors

import { selectAllSheets, updateSheet, fetchSheetsForGame} from '../sheet/sheetsSlice'
import FTDSheet from '../forTheDungeon/FTDSheet'

const makeSheetsForGame = (gameId) =>
	(state) => selectAllSheets(state).filter(s => s.gameId == gameId)


export default function GameSheets({ gameId }) {
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false)
	useEffect(async () => {
		setLoading(true)
		await dispatch(fetchSheetsForGame(gameId));
		setLoading(false)
	}, []);

	const sheetSelector = useMemo(() => makeSheetsForGame(gameId), [gameId])
	const sheets = useSelector(sheetSelector) || []

	// TODO float / flex sheets (need to pull container class out of sheets?, can use extend to put it back in only where needed
	// TODO make anchor TOC easy to get at (sticky)
	// TODO condense TOC, horiz or collapsing
	return (
		<div>
			<div>
				<ul>
					{
					loading?
						<li>
							<span className="spinner-ellipsis-1"></span>
							<span className="spinner-ellipsis-2"></span>
							<span className="spinner-ellipsis-3"></span>
						</li>
					:
						sheets.map((sheet) => {
							return (
								<li key={`game-link-${sheet._id}`}>
									<HashLink to={`#sheet-${sheet._id}`}>
										{ sheet.name || "Unamed" }
									</HashLink>
								</li>
							)
						})
					}
				</ul>
			</div>
			<div className="container">
			<div className="d-flex flex-wrap">
				{ loading ||
						sheets.map(sheet =>
							<div
								className="gmSheet"
								id={`sheet-${sheet._id}`}
								key={sheet._id}
							>
								<FTDSheet
									readOnly={true}
									sheet={sheet}
								/>
							</div>
						)
				}
			</div>
			</div>
		</div>
	)
}
