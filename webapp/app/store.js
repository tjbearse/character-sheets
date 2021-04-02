import { configureStore } from '@reduxjs/toolkit'
import gamesSlice from '../features/game/gamesSlice'
import sheetsSlice from '../features/sheet/sheetsSlice'


export default configureStore({
	reducer: {
		games: gamesSlice,
		sheets: sheetsSlice,
	}
})
