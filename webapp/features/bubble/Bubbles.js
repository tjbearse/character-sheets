import React, { useState } from 'react'
import uniqueId from 'lodash/uniqueId'


export default function Bubbles(props) {
	// unique ids for checkboxes allows clickable labels
	const [ id ] = useState(() => uniqueId('bubbles-'))

	const onChange = (i) => {
		if (props.readOnly) return;
		console.log(props)
		props.input.value != i ? props.input.onChange(i) : props.input.onChange(i-1)
	}

	console.log(props)
	return <div className="dots row justify-content-between">
		<input type="hidden" name={props.input.name} className="dot" value={props.input.value} />
		{
			Array(props.max).fill().map((_, i) => 
				<span key={i} className="col">
					<input
						type="checkbox"
						name={`${props.input.name}_${i}`}
						id={`${id}_${i}`}
						checked={i < props.input.value}
						onChange={()=>onChange(i+1)}
						className="form-check-input"
					/>
					<label htmlFor={`${id}_${i}`} />
				</span>
			)
		}
	</div>
}
