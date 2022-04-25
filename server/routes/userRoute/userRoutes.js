const express = require('express');
const { protect } = require('../../middleware/authMiddleware');
const {registerUser, loginUser, getMe} = require('./userController');

const userRouter = express.Router();

userRouter.post('/', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/me', protect, getMe);

module.exports = userRouter;