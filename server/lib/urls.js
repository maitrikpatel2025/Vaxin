let origins,paths;

let base;
if (process.env.NODE_ENV === 'production'){
	origins = {
		server: process.env.PROD_BASE_URL,
		app: process.env.PROD_APP_URL,
	}
	base = 'public';
}else{
	origins = {
		server: process.env.DEV_BASE_URL,
		app: process.env.DEV_APP_URL,
	}
	base = 'public';
}
paths = {
}

module.exports = { origins, paths };