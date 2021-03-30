import React from 'react'
import { Form, Field } from 'react-final-form'
import AutoSave from './AutoSave'

export default function FTDSheet(props) {
	const save = props.save || (()=>({}))
	return (
		<Form
			onSubmit={save /* NOT USED, but required */}
			initialValues={props.sheet}
			subscription={{}}
		>
			{() => (
				<div className="form">
					{!props.readonly && <AutoSave debounce={1000} save={save} />}
					<div>
						<label>Name</label>
						<Field
							name="name"
							component="input"
							type="text"
							placeholder="Character Name"
							disabled={props.readonly}
						/>
					</div>
					<div>
						<label>Description</label>
						<Field
							name="description"
							component="input"
							type="text"
							placeholder="Character Description"
							disabled={props.readonly}
						/>
					</div>
					<div>
						<label>Perk</label>
						<Field
							name="perk"
							component="input"
							type="text"
							placeholder="Character Perk"
							disabled={props.readonly}
						/>
					</div>
					<div>
						<label>Talent</label>
						<Field
							name="talent"
							component="input"
							type="text"
							placeholder="Talent"
							disabled={props.readonly}
						/>
					</div>
					<div>
						<label>Tool</label>
						<Field
							name="tool"
							component="input"
							type="text"
							placeholder="Tool"
							disabled={props.readonly}
						/>
					</div>
					<div>
						<label>Motivation</label>
						<Field
							name="motivation"
							component="input"
							type="text"
							placeholder="Motivation"
							disabled={props.readonly}
						/>
					</div>
					<div>
						<label>Harm</label>
						<Field
							name="harm"
							component="input"
							type="number"
							placeholder="Harm"
							disabled={props.readonly}
						/>
					</div>
					<div>
						<label>Zeal</label>
						<Field
							name="zeal"
							component="input"
							type="number"
							placeholder="Zeal"
							disabled={props.readonly}
						/>
					</div>
					<div>
						<label>Items</label>
						<Field
							name="items"
							component="textarea"
							placeholder="Items"
							disabled={props.readonly}
						/>
					</div>
					<div>
						<label>Notes</label>
						<Field
							name="notes"
							component="textarea"
							placeholder="Notes"
							disabled={props.readonly}
						/>
					</div>
				</div>
			)}
		</Form>
	)
}
