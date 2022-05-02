const db = require("../models");
const User = db.user;
var bcrypt = require("bcryptjs");

exports.signup = (req,res) => {
	User.findOne({
		email:req.body.email
		})
		.exec((err,user) =>{
			if(err) {
				res.status(500).send({message:err});
				return;
			}
			if(user) {
				return res.status(404).send({message:"User already exists"});
			}
			else{
					const user = new User({
						email:req.body.email,
						firstname:req.body.firstname,
						lastname:req.body.lastname,
						country:req.body.country,
						city:req.body.city,
						phonenumber:req.body.phonenumber,
						password:bcrypt.hashSync(req.body.password,10)
					});
					user.save((err) => {
						if(err) {
							res.status(500).send({message:err});
							return;
						}
						res.send({message:"User was registered successfully"});
					});
				}
			});
	};
exports.signin = (req,res) => {
	console.log(req.body.email)
	User.findOne({
		email:req.body.email
	})
		.exec((err,user) => {
			console.log(user)
			if(err) {
				res.status(500).send({message:err});
				return;
			}
			if(!user) {
				return res.status(404).send({message:"User not found"});
			}
			var passwordIsValid = bcrypt.compareSync(
				req.body.password,
				user.password
			);
			if(!passwordIsValid) {
				return res.status(401).send({message:"Invalid Password"});
			}
			res.status(200).send({
				id:user._id,
				email:user.email
			});
		});
};

