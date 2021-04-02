import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter
} from '@reduxjs/toolkit'

import gameAPI from './gameAPI'


export const fetchGame = createAsyncThunk('games/fetchOne', async id => {
	const response = await gameAPI.fetchOne(id)
	return response
})

export const fetchGames = createAsyncThunk('games/fetchAll', async () => {
	const response = await gameAPI.fetchAll()
	return response
})

export const updateGame = createAsyncThunk('games/updateOne', async gamePatch => {
	const response = await gameAPI.updateGame(gamePatch)
	return gamePatch
})

export const createGame = createAsyncThunk('games/addOne', async gamePatch => {
	const response = await gameAPI.createGame(gamePatch)
	return Object.assign({}, gamePatch, response)
})

export const gamesAdapter = createEntityAdapter({
	selectId: (e) => e._id,
})

const initialState = gamesAdapter.getInitialState()

const slice = createSlice({
	name: 'games',
	initialState,
	extraReducers: builder => {
		// should this be set instead of upsert?
		builder.addCase(fetchGames.fulfilled, gamesAdapter.upsertMany)
		builder.addCase(fetchGame.fulfilled, gamesAdapter.upsertOne)
		builder.addCase(updateGame.fulfilled, gamesAdapter.updateOne)
		builder.addCase(createGame.fulfilled, gamesAdapter.upsertOne)
	}
})

export const {
	selectById: selectGameById,
	selectIds: selectGameIds,
	selectEntities: selectGameEntities,
	selectAll: selectAllGames,
	selectTotal: selectTotalGames
} = gamesAdapter.getSelectors(state => state.games)

const reducer = slice.reducer
export default reducer
