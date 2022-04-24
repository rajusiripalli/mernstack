const express = require('express');
const {registerUser, loginUser, getMe} = require('./userController');

const userRouter = express.Router();

userRouter.post('/', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/me', getMe);

module.exports = userRouter;