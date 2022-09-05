const express = require("express");
const {getBlogs, createBlogs} = require("../controller/blogController")
const blogRoutes = express.Router()

blogRoutes.get("/", getBlogs);
blogRoutes.post("/", createBlogs)

module.exports = blogRoutes