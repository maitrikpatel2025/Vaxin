import {DEV_SERVER_URL, PROD_SERVER_URL} from '@env';

export const POST = (url, data, headers = {}) => {
	if (!url) return null;
	let nodeUrl;
	if (process.env.NODE_ENV === "production")
		nodeUrl = 'http://192.168.15.1:3001';
	else
		nodeUrl = 'http://192.168.15.1:3001';

	let options = {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'credentials': 'include',
			...headers,
		}
	}
	return new Promise(resolve => {
		fetch(nodeUrl + url, options)
            .then(response=>response.json())
			.then(resolve)
			.catch((e) => {
                console.log("request.js>31",e);
			})
	});
}