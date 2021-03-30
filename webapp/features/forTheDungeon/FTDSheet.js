import React from 'react'
import { Form, Field } from 'react-final-form'
import AutoSave from './AutoSave'
import Bubbles from '../bubble/Bubbles'
import style from './style.css'

export default function FTDSheet(props) {
	const save = props.save || (()=>({}))
	const formClassName = "form-control"
	return (
		<Form
			onSubmit={save /* NOT USED, but required */}
			initialValues={props.sheet}
			subscription={{}}
		>
			{() => (
				<form className="container sheet">
					{!props.readOnly && <AutoSave debounce={1000} save={save} />}
					<div className="row">
						<div className="col">
							<div className="form-group">
								<label>Name</label>
								<Field
									name="name"
									component="input"
									type="text"
									placeholder="Character Name"
									readOnly={props.readOnly}
									className={formClassName}
								/>
							</div>
							<div className="form-group">
								<label>Description</label>
								<Field
									name="description"
									component="textarea"
									rows="2"
									placeholder="Character Description"
									readOnly={props.readOnly}
									className={formClassName}
								/>
							</div>
							<div className="form-group">
								<label>Perk</label>
								<Field
									name="perk"
									component="input"
									type="text"
									placeholder="Character Perk"
									readOnly={props.readOnly}
									className={formClassName}
								/>
							</div>
						</div>
						<div className="col"><div className="card bg-light "><div className="card-body">
							<div className="form-group">
								<label>Talent</label>
								<Field
									name="talent"
									component="input"
									type="text"
									placeholder="Talent"
									readOnly={props.readOnly}
									className={formClassName}
								/>
							</div>
							<div className="form-group">
								<label>Tool</label>
								<Field
									name="tool"
									component="input"
									type="text"
									placeholder="Tool"
									readOnly={props.readOnly}
									className={formClassName}
								/>
							</div>
							<div className="form-group">
								<label>Motivation</label>
								<Field
									name="motivation"
									component="input"
									type="text"
									placeholder="Motivation"
									readOnly={props.readOnly}
									className={formClassName}
								/>
							</div>
						</div></div></div>
					</div>
					<div className="row mt-4">
						<div className="col">
							<label className="">Harm</label>
							<div className="dot-box harm">
								<Field
									name="harm"
									placeholder="Harm"
									type="number"
									className={`${formClassName}`}
									render={ ({input,}) => (
										<Bubbles label="Harm" max={6} readOnly={props.readOnly} input={input}/>
									)}
								/>
							</div>
						</div>
						<div className="col">
							<label className="">Zeal</label>
							<div className="dot-box zeal">
								<Field
									name="zeal"
									type="number"
									placeholder="Zeal"
									className={`${formClassName}`}
									render={ ({input,}) => (
										<Bubbles label="Zeal" max={5} readOnly={props.readOnly} input={input}/>
									)}
								/>
							</div>
						</div>
					</div>
					<div className="row mt-4">
						<div className="col form-group">
							<label>Items</label>
							<Field
								name="items"
								component="textarea"
								placeholder="Items"
								rows="4"
								readOnly={props.readOnly}
								className={formClassName}
							/>
						</div>
						<div className="col form-group">
							<label>Experience</label>
							<Field
								name="experience"
								component="textarea"
								placeholder="Experiences"
								rows="4"
								readOnly={props.readOnly}
								className={formClassName}
							/>
						</div>
					</div>
				</form>
			)}
		</Form>
	)
}
