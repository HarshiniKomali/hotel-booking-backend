const express = require('express');
const controller = require("../controllers/user_controller");
const router = express();
router.post('/signin',controller.signIn);
router.post('/signup',controller.signUp);
router.post('/updatedetails',controller.updateProfile);
router.get('/searchhotel',controller.searchHotels);
module.exports = router;
