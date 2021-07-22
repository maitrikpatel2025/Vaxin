const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true},
	(err) => {
		if (err) throw err;
		console.log("MongoDB connection established");
	}
);

function mongooseSetup(obj) {
	let keys = Object.keys(obj);
	let db = {};
	keys.forEach(k=>{
		let model = mongoose.model(k,obj[k]);
		db[k]=(data=null)=>{
			if (data) return new model(data)
			else
				return model
		}
	});
	return db;
}
module.exports = mongooseSetup({
	User: {
		created_at: Number,
		email: String,
		password: String,
		first_name: String,
		last_name: String,
		country: String,
		manufacturer: String,
		lot_number: String,
		date: String,
		clinic_site: String,
		vaccine: String,
		doc_type: String,
		identification_number: String,
	},
	Admin: {
		email: String,
		username: String,
		name: String,
		password: String
	},
	Viewer: {
		ip: String,
		timestamp: Number,
		user_id: Number,
	}
});