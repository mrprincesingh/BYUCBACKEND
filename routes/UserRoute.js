const express = require('express');
const { register, login, Logout } = require('../controllers/User');


const router = express.Router();

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(Logout)


module.exports = router
