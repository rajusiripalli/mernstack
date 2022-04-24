const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../../models/userModel');

//@desc Register New User
//@route POST /api/user
//@acces Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password } = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields');
    }

    //check if user exists
    const userExist = await User.findOne({email})

    if(userExist){
        res.status(400)
        throw new Error('User already exists');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user  = await User.create({
        name,
        email,
        password: hashedPassword
    })
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//@desc Authenticate a new User
//@route POST /api/user/login
//@acces Private
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    
    //Check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

//@desc Get user data
//@route GET /api/user/me
//@acces Public
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json({message: "User Data Display"})
})

module.exports = {
    registerUser,
    loginUser,
    getMe,
}