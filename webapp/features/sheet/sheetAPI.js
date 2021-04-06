import { ajax } from 'jquery'

const basePath = '/api'

export default {
	fetchOne(sheetId) {
		if (!sheetId) {
			return Promise.reject(new Error('no id given'))
		}
		return ajax(`${basePath}/sheets/${sheetId}`)
	},
	fetchAll() {
		return ajax(`${basePath}/sheets`)
	},
	fetchAllInGame(gameId) {
		if (!gameId) {
			return Promise.reject(new Error('no gameId given'))
		}
		return ajax(`${basePath}/games/${gameId}/sheets`)
	},

	updateSheet(sheetPatch) {
		const id = sheetPatch._id
		if (!id) {
			return Promise.reject(new Error('no id given'))
		}
		return ajax(`${basePath}/sheets/${sheetPatch._id}`, {
			method: 'PUT',
			data: JSON.stringify(sheetPatch),
			contentType: 'application/json'
		})
	},
	createSheet(sheet) {
		return ajax(`${basePath}/sheets`, {
			method: 'POST',
			data: JSON.stringify(sheet),
			contentType: 'application/json'
		})
	},
}
