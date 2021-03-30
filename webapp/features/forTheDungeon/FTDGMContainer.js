import React from 'react';
import FTDSheet from './FTDSheet'
import getParams from './urlHashParam'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const load = async () => {
	// await sleep(2000)
	return {
		"123":{
			name: "Alpha",
			description: "d",
			perk: "p",
			talent: "t",
			tool: "t",
			motivation: "m",
			harm: 1,
			zeal: 6,
			items: "_",
		},
		"456": {
			name: "Bravo",
			description: "d",
			perk: "p",
			talent: "t",
			tool: "t",
			motivation: "m",
			harm: 1,
			zeal: 6,
			items: "_",
		},
	}
}

export default class FTDGMContainer extends React.Component {
	state = { sheets: {} }

	// TODO load and websocket watch

	async componentDidMount() {
		this.setState({ loading: true })
		const sheets = await load()
		this.setState({ loading: false, sheets })
	}

    render() {
		return (
			this.state.loading ?
				"Loading..."
			: (
				<div>
				{
					Object.keys(this.state.sheets)
						.map((id) =>
							<FTDSheet
								key={id}
								readOnly={true}
								sheet={this.state.sheets[id]}
							/>
						)
				}
				</div>
			)
		)
	}
}
