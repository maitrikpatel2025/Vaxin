const router = require('express').Router();
const db = require('../lib/db');
const {random_string} = require("../lib/extras");
const mailer = require('../lib/mail');
const ejs = require('ejs');

router.post('/add',async (req, res) => {
	let password = random_string(8);
	let created_at = new Date().getTime();

	let result = await db.User({created_at,password,...req.body}).save();
	if (!result){
		res.json({
			code: 400
		});
	}
	let template = await ejs.renderFile('./mails/user_account.ejs',{
		email: req.body.email,
		password,
	},{async: true});
	mailer.sendMail(req.body.email,'Covid App Account',template);

	res.json({
		code: 200,
	});
});
router.post('/update',async (req, res) => {
	let data = req.body;
	let created_at = data.created_at;
	delete data.created_at;
	let result = await db.User().updateOne({created_at},{$set:data},{upsert: true});
	if (!result){
		res.json({
			code: 400
		});
	}
	res.json({
		code: 200,
	});
});
router.post('/delete',async (req, res) => {
	let _id = req.body._id;

	let result = await db.User().remove({_id});
	if (!result){
		res.json({
			code: 400
		});
	}

	res.json({
		code: 200,
	});
});
router.post('/check_unique',async (req, res) => {
	let result = await db.User().find(req.body);

	if (result.length === 0){
		res.json({
			code: 400
		});
	}else{
		res.json({
			code: 201
		});
	}
});

router.post('/list',async (req, res) => {
	if (!req.auth.admin_id){
		res.json({
			code: 202,
		});
		return;
	}
	let adminData = await db.Admin().find({_id:req.auth.admin_id});
	if (adminData.length === 0){
		res.json({
			code: 202,
		});
		return;
	}

	let result = await db.User().find();
	if (!result){
		res.json({
			code: 400
		});
	}
	console.log(result);
	res.json({
		code: 200,
		data: result
	});
});
router.post('/get_details',async (req, res) => {
	let created_at = req.body.user_id;
	try{
		created_at = parseInt(created_at);
	}catch (e) {
		res.json({
			code: 400
		});
		return
	}
	let result = await db.User().find({created_at});
	if (!result){
		res.json({
			code: 400
		});
	}
	res.json({
		code: 200,
		data: result[0]
	});
});

function fetchUserIP(req) {
	let ip;
	if (req.headers['x-forwarded-for']) {
		ip = req.headers['x-forwarded-for'].split(",")[0];
	} else if (req.connection && req.connection.remoteAddress) {
		ip = req.connection.remoteAddress;
	} else {
		ip = req.ip;
	}
	if (ip && ip.substr(0, 7) === "::ffff:") {
		ip = ip.substr(7)
	}
	return ip;
}
router.post('/status',async (req, res) => {
	let user_id = req.body.user_id;
	await db.Viewer({
		ip: fetchUserIP(req),
		timestamp: new Date().getTime(),
		user_id,
	}).save();

	let data = await db.User().find({created_at: user_id});
	res.json({
		code: 200,
		data: data[0],
	});
});
router.post('/viewers',async (req, res) => {
	db.Viewer().aggregate([{
		$lookup: {
			from: db.User().collection.name,
			localField: "user_id",
			foreignField: "created_at",
			as: "User"
		}
	}]).exec(function(err, data) {
		res.json({
			code: 200,
			list: data,
		});
	});
});

module.exports = router;