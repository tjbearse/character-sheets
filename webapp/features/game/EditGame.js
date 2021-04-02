import React from 'react'
import { Form, Field } from 'react-final-form'

export function EditGameContainer ({ game, save }) {
	return (
		<EditGame game={game} save={save}/>
	)
}

const defaultGame = { name: "", players: [] }
export function NewGameContainer({ createGame }) {
	// TODO save new
	return (
			<EditGame game={defaultGame} save={createGame}/>
	)
}

export function EditGame({ game, save, readOnly }) {
	return (
		<Form
			onSubmit={save}
			initialValues={game}
			subscription={{}}
			render = {({handleSubmit, submitting, pristine}) => (
				<form onSubmit={handleSubmit}>
					<div>
						<label>Name</label>
						<Field
							name="name"
							component="input"
							type="text"
							placeholder="New Game"
							disabled={readOnly}
						/>
						{ /* todo add players */ }
					</div>
					<div>
						<button type="submit" disabled={submitting || pristine}>
							Submit
						</button>
					</div>
				</form>
			)}
		/>
	)
}
