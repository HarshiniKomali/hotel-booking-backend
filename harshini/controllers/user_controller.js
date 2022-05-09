const User = require("../models/user_model");
const Hotel=require("../models/hotel_model")
var bcrypt = require("bcryptjs");

exports.signUp=(req,res)=>{
    User.findOne({
        email:req.body.email
    })
    .exec((err,user)=>{
        if (err){
            res.status(500).send({message:err});
        }
        if(user){
            res.status(404).send({message:"User already exists."});
        }
        if(!user){
            const user=new User({
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                password:bcrypt.hashSync(req.body.password,10),
                dob:req.body.dob,
                mobile:req.body.mobile
                
            });
            user.save((err)=>{
                if(err){
                    res.status(500).send({message:err});
                }
                res.send({message:"User was registered successfully"});
            });
        }
    });
};

exports.signIn=(req,res)=>{
    User.findOne({email:req.body.email})
    .exec((err,user)=>{

        if(err){
            res.status(500).send({message:err});
        }

        if(!user){
            res.status(404).send({message:"User not found"});
        }
        var passwordIsValid=bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if(!passwordIsValid){
            res.status(401).send({message:"Invalid Password"});
        }
        res.status(200).send({
            id:user._id,
            email:user.email
        });
    });
};
exports.updateProfile = (req,res) => {
	User.findOne({
		email:req.body.email
	})
		.exec((err,user) => {
			if(err){
				res.status(500).send({message:err});
				return;
			}
			if(!user) {
				return res.status(404).send({message:"User not found"});
			}
			if(req.body.firstname){
				user.firstName = req.body.firstname;
			}
			if(req.body.lastname){
				user.lastName = req.body.lastname;
			}
			if(req.body.dob){
				user.dob = req.body.dob;
			}
			if(req.body.mobile){
				user.mobile = req.body.mobile;
			}
			if(req.body.password){
				user.password = bcrypt.hashSync(req.body.password,10);
			}
			user.save((err) => {
				if(err) {
					res.status(500).send({message:err});
					return;
				}
				res.send({message:"Details updated successfully"});
			});
		});
};

exports.searchHotels=(req,res)=>{
    Hotel.findOne({$and:[
        {"cit":req.body.city},
        {"state":req.body.state},
        {"country":req.body.country},
        {rooms:{"availableDates":req.body.startDate}}
        //{"rooms.availableDates":{$gte:req.body.startDate,$lte:req.body.endDate}}]
        //"rooms":{"availableDates":new Date(req.body.endDate)}
        //$and:[{"rooms.availableDates":{$gte:req.body.startDate,$lte:req.body.endDate}},{}],
    //     $and:[{"rooms.availableDates":{$gte:req.body.startDate,$lte:req.body.endDate}},
    // {$or:[{"rooms.singleRoomCount":{$gt:0}},{"rooms.doubleRoomCount":{$gt:0}},{"rooms.suiteRoomCount":{$gt:0}}]}]

	]})
    .exec((err,searchResults) => {
        if(err){
            res.status(500).send({message:err});
        }
        console.log(req.body.startDate)
        if(!searchResults){
            res.send({message:"There are no hotels based on your inputs.Please change dates or eminities."})
        }
        if(searchResults){
            res.send(searchResults);
        
        }

    })
};