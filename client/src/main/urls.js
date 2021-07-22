let pages = {
	home: '/home',
	viewers: '/viewers',
	login: '/login',
	about:'/about',
	add_user: (id=null)=>{
		return id ? '/users/add/'+id : '/users/add'
	},
}
let server = {
	admin_signup: 'auth/admin_signup',
	admin_login: 'auth/admin_login',
	admin_check_unique: 'auth/check_unique',
	admin_logout: 'auth/admin_logout',
	user_check_unique: 'users/check_unique',
	user_list: 'users/list',
	add_user: 'users/add',
	update_user: 'users/update',
	delete_user: 'users/delete',
	user_details: 'users/get_details',
	countries: 'countries',
	viewer_list: 'users/viewers',
}

export {
	pages,
	server
}