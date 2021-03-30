import React from 'react'
import { Form, Field } from 'react-final-form'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

// save difference
const save = async values => {
	await sleep(2000)
	console.log('Saving', values)
}

export class EditGameContainer extends React.Component {
	// TODO load form
	render() {
		return (
			<EditGame save={save}/>
		)
	}
}
export function NewGameContainer() {
	// TODO save new
	return (
			<EditGame save={save}/>
	)
}

export function EditGame(props) {
	return (
		<Form
			onSubmit={props.save}
			initialValues={props.game}
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
							disabled={props.readonly}
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
