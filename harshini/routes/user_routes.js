const express = require('express');
const controller = require("../controllers/user.controller");
const router = express();
router.post('/signin',controller.signin);
router.post('/signup',controller.signup);
module.exports = router;
