const mongoose = require("mongoose");

const Blogs = require("../model/blogModel")
const Users = require("../model/authModel")

const getBlogs = async (req, res) => {
    let blogs;
    try {
        blogs = await Blogs.find()
        res.status(200).json(blogs)
    } catch (error) {
        console.log(error)
    }
};

const createBlogs = async (req, res) => {
    const {title, description, user} = req.body
    let existingUser = await Users.findById(user)
    if(!existingUser) {
        res.status(404).json({message: "User not found, register user"})
    } else {
        const blog = new Blogs({
            title,
            description,
            user
        });
        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            await blog.save({session});
            existingUser.blogs.push(blog);
            await existingUser.save({session})
            session.commitTransaction();
        } catch (error) {
          console.log(error)  
        }
    }
    
};

module.exports = {
    getBlogs, createBlogs
}