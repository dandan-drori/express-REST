const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

router.get("/", usersController.users_get_all);

router.post("/", usersController.users_add_user);

router.patch("/", usersController.users_update_user);

router.delete("/", usersController.users_delete_user);

module.exports = router;
