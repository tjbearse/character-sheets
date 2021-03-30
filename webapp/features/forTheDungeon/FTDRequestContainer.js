import React from 'react';
import FTDSheet from './FTDSheet'
import getParams from './urlHashParam'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

// save difference
const save = async values => {
	console.log('Saving', values)
	await sleep(2000)
}

const load = async (id) => {
	await sleep(2000)
	return id=="123"? {
		name: "Alpha",
		description: "d",
		perk: "p",
		talent: "t",
		tool: "t",
		motivation: "m",
		harm: 1,
		zeal: 6,
		items: "_",
	} : {
		name: "Bravo",
		description: "d",
		perk: "p",
		talent: "t",
		tool: "t",
		motivation: "m",
		harm: 1,
		zeal: 6,
		items: "_",
	}
}

export default class FTDRequestContainer extends React.Component {
	state = { sheet: undefined }

	async componentDidMount() {
		const params = getParams();
		let sheetID = params['sheet']
		this.setState({ loading: true })
		const sheet = await load(sheetID)
		this.setState({ loading: false, sheet })
	}

    render() {
		return (
			this.state.loading?
				"Loading..."
			: (
			<FTDSheet
				sheet={this.state.sheet}
				save={save}
			/>
			)
		)
	}
}
