// from https://final-form.org/docs/react-final-form/examples
import React from 'react'
import { FormSpy } from 'react-final-form'
import diff from 'object-diff'

class AutoSave extends React.Component {
	constructor(props) {
		super(props)
		this.state = { values: props.values, submitting: false }
	}

	componentWillReceiveProps(nextProps) {
		if (this.timeout) {
			clearTimeout(this.timeout)
		}
		console.log("set save timeout");
		this.timeout = setTimeout(this.save, this.props.debounce)
	}

	save = async () => {
		if (this.promise) {
			await this.promise
		}
		const { pristine, values, save } = this.props
		if (pristine) return;

		// This diff step is totally optional
		console.log(this.props)
		// BUG it is possible to retrigger a save on pristine data by navigating to the current page
		// BUG difference doesn't pick up missing keys, form does not include keys for empty strings
		// const difference = diff(this.state.values, values)
		//if (Object.keys(difference).length) {
			// values have changed
			this.setState({ submitting: true, values })
			// this.promise = save(difference)
			this.promise = save(values)
			await this.promise
			delete this.promise
			this.setState({ submitting: false })
		//} else {
		//	console.log("no difference, abandon save")
		//}
	}

	render() {
		// This component doesn't have to render anything, but it can render
		// submitting state.
		return (
			this.state.submitting && <div className="submitting">Submitting...</div>
		)
	}
}

// Make a HOC
// This is not the only way to accomplish auto-save, but it does let us:
// - Use built-in React lifecycle methods to listen for changes
// - Maintain state of when we are submitting
// - Render a message when submitting
// - Pass in debounce and save props nicely
export default props => (
	<FormSpy {...props} subscription={{ pristine: true, values: true }} component={AutoSave} />
)
