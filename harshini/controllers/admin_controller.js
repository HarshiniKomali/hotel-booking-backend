const Hotel = require("../models/hotel_model");


//adding new Hotel
exports.addHotel=(req,res)=>{

    if (req.body){
        const hotel=new Hotel({
            name:req.body.name,
            star:req.body.star,
            prices:req.body.prices,
            rooms:req.body.rooms,
            address:req.body.address,
            amenities:req.body.amenities,
            city:req.body.city,
            date:req.body.date,
            state:req.body.state,
            country:req.body.country,
            zipCode:req.body.zipCode,
            contact:req.body.contact
        });
        hotel.save((err)=>{
            if(err){
                res.status(500).send({message:err});
            }
            res.send({message:"Hotel added successfully"});
        });
    }
    else{
        res.status(404).send({message:"Please enter hotel details"});
    }
};

exports.deleteHotel = (req,res) => {
    Hotel.findOne({
        name:req.body.name,
        city:req.body.city,
        state:req.body.city,
        country:req.body.country
    })
    .exec((err,hotel) => {
        if(err) {
            res.status(500).send({message:err});
            return;
        }
        if(!hotel) {
            return res.status(404).send({message:"Hotel not found"});
        }
        Hotel.findOneAndRemove({_id:hotel._id});
        return res.status(200).send({message:"Hotel removed successfully"});
    });
};
