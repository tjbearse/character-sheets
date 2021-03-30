// https://stackoverflow.com/questions/23699666/javascript-get-and-set-url-hash-parameters
export default () => 
	window.location.hash
		.substr(1)
		.split('&')
		.reduce((res, item) => {
			const parts = item.split('=');
			res[parts[0]] = parts[1];
			return res;
		}, {})
