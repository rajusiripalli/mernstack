const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const ObjectId = mongoose.ObjectId
const Goal = require('../../models/goalModel');
const User = require('../../models/userModel');

//@desc SetGoal
//@route GET /api/goals
//@access private
const  getGoals = asyncHandler(async (req, res)=>{
    const goals = await Goal.find({ user: req.user._id});

    res.status(200).json(goals)
}
)


//@desc SetGoal
//@route POST /api/goals
//@access private
const  setGoals = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field');

    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user._id,
    })
    res.status(200).json(goal)
    }
)

//@desc UpdateGoal
//@route PUT /api/goals
//@access private
const updateGoals = asyncHandler(async (req, res) =>{
    const goal = await Goal.findById(req.params.id)
  
    if(!goal){
        res.status(400)
        throw new Error('Goal not found');
    }

    const user = await User.findById(req.user._id);

    //Check for user
    if(!user){
        res.status(401)
        throw new Error('User not found');
    }

    //Make sure the logged in user matches the goal user
    console.log("goal "+goal.user.toString());
    if(goal.user.toString() !== user._id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedGoal);

    }
)


//@desc DeleteGoal
//@route DELETE /api/goals
//@access private
const deleteGoals = asyncHandler(async (req, res)=> {
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found');
    }

    const user = await User.findById(req.user._id);
    //console.log("user  ==> ", user);

    //Check for user
    if(!user){
        res.status(401)
        throw new Error('User not found');
    }
    //console.log("goal ---->"+goal.user.toString())
    //Make sure the logged in user matches the goal user
    if(goal.user.toString() !== user._id.toString()){
        res.status(401)
        throw new Error('User not authorized')
    }

    await goal.remove();

    res.status(200).json({id: req.params.id})
 }
)


module.exports ={
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}

