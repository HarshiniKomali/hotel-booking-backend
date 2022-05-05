const express = require('express');
const controller = require("../controllers/user_controller");
const router = express();
router.post('/signin',controller.signin);
router.post('/signup',controller.signUp);
router.put('/updatedetails',controller.updateProfile);
module.exports = router;