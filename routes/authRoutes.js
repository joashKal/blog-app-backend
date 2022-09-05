const express = require("express")
const {getUsers, registerUsers, loginUsers} = require("../controller/authController")
const authRoutes = express.Router();

authRoutes.get("/", getUsers)
authRoutes.post("/register", registerUsers)
authRoutes.post("/login", loginUsers)

module.exports = authRoutes;