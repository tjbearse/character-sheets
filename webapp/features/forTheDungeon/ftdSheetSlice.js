import { createSlice } from '@reduxjs/toolkit'

export const ftdSheetSlice = createSlice({
	name: 'ftdSheet',
	initialState: {
		name: "",
		description: "",
		perk: "",
		talent: "",
		tool: "",
		motivation: "",
		harm: 0,
		zeal: 5,
		items: "",
	},
	reducers: {
		updateName: (state, action) => {
			state.name = action.payload
		},
		updateDescription: (state, action) => {
			state.description = action.payload
		},
		updatePerk: (state, action) => {
			state.perk = action.payload
		},
		updateTalent: (state, action) => {
			state.talent = action.payload
		},
		updateTool: (state, action) => {
			state.tool = action.payload
		},
		updateMotivation: (state, action) => {
			state.motivation = action.payload
		},
		updateHarm: (state, action) => {
			state.harm = action.payload
		},
		updateZeal: (state, action) => {
			state.zeal = action.payload
		},
		updateItems: (state, action) => {
			state.items = action.payload
		},
	}
})

// Action creators are generated for each case reducer function
export const { 
		updateName,
		updateDescription,
		updatePerk,
		updateTalent,
		updateTool,
		updateMotivation,
		updateHarm,
		updateZeal,
		updateItems,
 } = ftdSheetSlice.actions

export default ftdSheetSlice.reducer
