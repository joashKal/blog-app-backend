const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const Users = require("../model/authModel")

const getUsers = async (req, res) => {
    const users = await Users.find();
    res.status(200).json(users)
};

const registerUsers = async (req, res) => {
    const {name, email, password} = req.body;
    const user = await Users.findOne({email});
    if(user) {
        res.status(400).json({message: "User exists, Login instead"})
    } else {
        const hashedPassword = bcrypt.hashSync(password, 10)
        const newUser = await Users.create({
            name,
            email,
            password: hashedPassword,
            blogs: []
        })
        if(newUser) {
            res.status(201).json(newUser)
        } else {
            res.status(500).json({message: "User could not be created"})
        }
    }
};

const loginUsers = async (req, res) => {
    const {email, password} = req.body;
    const user = await Users.findOne({email});
    if(!user){
        res.status(404).json({message: "User not found, Register user"});
    } else {
        const isMatch = bcrypt.compareSync(password, user.password);
        if(isMatch) {
            res.status(200).json(user)
        } else {
            res.status(400).json({message: "Wrong login credentials"})
        }
    }
};

module.exports = {getUsers, registerUsers, loginUsers}

