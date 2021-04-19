const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login");

router.get("/", loginController.login_get_all);

router.post("/", loginController.login_login_user);

router.delete("/", loginController.login_signout_user);

module.exports = router;
