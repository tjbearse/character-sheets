import { ajax } from 'jquery'

const basePath = '/api'

export default {
	fetchOne(gameId) {
		if (!gameId) {
			return Promise.reject(new Error('no id given'))
		}
		return ajax(`${basePath}/games/${gameId}`)
	},
	fetchAll() {
		return ajax(`${basePath}/games`)
	},

	updateGame(gamePatch) {
		const id = gamePatch._id
		if (!id) {
			return Promise.reject(new Error('no id given'))
		}
		return ajax(`${basePath}/games/${gamePatch._id}`, {
			method: 'PUT',
			data: gamePatch
		})
	},
	createGame(game) {
		return ajax(`${basePath}/games`, {
			method: 'POST',
			data: game
		})
	},
}
