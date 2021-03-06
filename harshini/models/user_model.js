const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");

const Schema=mongoose.Schema;

//Creating user schema and model

const userSchema =new Schema({

	firstName:{
		type:String,
		required:[true,'First Name field is required']
	},
	lastName:{
		type:String,
		required:[true,'Last Name field is required']
	},

	email:{
		type:String,
		required:[true,'Email is required']
	},
	password:{
		type:String,
		required:[true,'Password is required']
	},
	dob:{
		type:String
	},
	mobile:{
		type:String,
		required:[true,'Mobile number is required']
	},
	country:{
		type:String,
	},
	cit:{
		type:String,
	},
	dateCreated:{
		type:Date,
		default:Date.now
	}
});

const User = mongoose.model('User',userSchema);

module.exports=User;

