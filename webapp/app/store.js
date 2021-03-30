import { configureStore } from '@reduxjs/toolkit'
import ftdSheetReducer from '../features/forTheDungeon/ftdSheetSlice'


export default configureStore({
	reducer: {
		sheet: ftdSheetReducer,
	}
})
