const router = require('express').Router();
const db = require('../lib/db');

router.post('/admin_signup',async (req, res) => {
	let email = req.body.email;
	let password = req.body.password;
	let name = req.body.name;
	let username = req.body.username;

	let result = await db.Admin({email,password,name,username}).save();
	if (!result){
		res.json({
			code: 400
		});
	}
	res.cookie(process.env.ADMIN_COOKIE,result._id);

	res.json({
		code: 200,
	});
});

router.post('/admin_logout',async (req, res) => {
	res.clearCookie(process.env.ADMIN_COOKIE);
	res.json({
		code: 200
	});
});
router.post('/admin_login',async (req, res) => {
	let email = req.body.email;
	let password = req.body.password;

	let result = await db.Admin().find({email});
	if (!result){
		res.json({
			code: 400
		});
	}
	if (result.length === 0){
		res.json({
			code: 203,
			errorMessage: 'Account not found'
		});
		return;
	}
	result = result[0];
	if (result.password !== password){
		res.json({
			code: 204,
			errorMessage: 'Wrong password'
		});
		return;
	}
	res.cookie(process.env.ADMIN_COOKIE,result._id);

	res.json({
		code: 200,
	});
});
router.post('/user_login',async (req, res) => {
	let email = req.body.email;
	let password = req.body.password;

	let result = await db.User().find({email});
	if (!result){
		res.json({
			code: 400
		});
	}
	if (result.length === 0){
		res.json({
			code: 203,
			errorMessage: 'Account not found'
		});
		return;
	}
	result = result[0];
	if (result.password !== password){
		res.json({
			code: 204,
			errorMessage: 'Wrong password'
		});
		return;
	}
	res.json({
		code: 200,
		id: result.created_at,
	});
});

router.post('/check_unique',async (req, res) => {
	let result = await db.Admin().find(req.body);

	if (result.length === 0){
		res.json({
			code: 200
		});
	}else{
		res.json({
			code: 201
		});
	}
});

module.exports = router;