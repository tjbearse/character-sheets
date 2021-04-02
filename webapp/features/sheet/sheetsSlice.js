import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter
} from '@reduxjs/toolkit'

import sheetAPI from './sheetAPI'

export const fetchSheet = createAsyncThunk('sheets/fetchOne', async arg => {
	const response = await sheetAPI.fetchOne(arg)
	return response
})

export const fetchSheets = createAsyncThunk('sheets/fetchAll', async () => {
	const response = await sheetAPI.fetchAll()
	return response
})

export const fetchSheetsForGame = createAsyncThunk('sheets/fetchAllInGame', async gameId => {
	const response = await sheetAPI.fetchAllInGame(gameId)
	return response
})

export const updateSheet = createAsyncThunk('sheets/updateOne', async sheetPatch => {
	const response = await sheetAPI.updateSheet(sheetPatch)
	return sheetPatch
})

export const sheetsAdapter = createEntityAdapter({
	selectId: (e) => e._id,
})

const initialState = sheetsAdapter.getInitialState()

const slice = createSlice({
	name: 'sheets',
	initialState,
	extraReducers: builder => {
		builder.addCase(fetchSheets.fulfilled, sheetsAdapter.upsertMany)
		builder.addCase(fetchSheetsForGame.fulfilled, sheetsAdapter.upsertMany)
		builder.addCase(fetchSheet.fulfilled, sheetsAdapter.upsertOne)
		builder.addCase(updateSheet.fulfilled, (state, { payload }) => {
			const { _id: id, ...changes } = payload
			sheetsAdapter.updateOne(state, { id, changes })
		})
	}
})

export const {
	selectById: selectSheetById,
	selectIds: selectSheetIds,
	selectEntities: selectSheetEntities,
	selectAll: selectAllSheets,
	selectTotal: selectTotalSheets
} = sheetsAdapter.getSelectors(state => state.sheets)
// TODO sheets for game selector

const reducer = slice.reducer
export default reducer
