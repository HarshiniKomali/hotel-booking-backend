const mongoose = require("mongoose");
const User = mongoose.model(
	"User",
	new mongoose.Schema({
		email:String,
		firstname:String,
		lastname:String,
		country:String,
		city:String,
		phonenumber:String,
		password:String
	})
);
module.exports = User;
