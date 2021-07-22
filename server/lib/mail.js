const nodemailer = require('nodemailer');

/**
 * @param {string} receiverAddress
 * @param {string} body
 * @param {string} subject
 * @returns {Boolean}
 */
async function sendMail(receiverAddress, subject, body) {
	// let testAccount = await nodemailer.createTestAccount();

	let transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465, //587
		secure: true, // true for 465, false for other ports
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD
		}
	});
	try {
		let result = await transporter.sendMail({
			from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_USERNAME}>`, // sender address
			to: receiverAddress, // list of receivers
			subject: subject, // Subject line
			html: body, // html body
		});
		if (result.accepted.length === 0) {
			console.log("mail.js>40", result);
			return false;
		}
		return true;
	} catch (e) {
		console.log(e);
	}
}

module.exports = {sendMail};