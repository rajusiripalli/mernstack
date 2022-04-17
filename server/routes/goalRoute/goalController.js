const asyncHandler = require('express-async-handler')


//@desc SetGoal
//@route GET /api/goals
//@access private
const  getGoals = asyncHandler(async (req, res)=>{
    res.status(200).json({message: "Get Goals"})
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
    res.status(200).json({message: "Set Goals"})
    }
)

//@desc UpdateGoal
//@route PUT /api/goals
//@access private
const updateGoals = asyncHandler(async (req, res) =>{
    res.status(200).json({message: `Update Goals ${req.params.id}`})
    }
)
//@desc DeleteGoal
//@route DELETE /api/goals
//@access private
const deleteGoals = asyncHandler(async (req, res)=> {
    res.status(200).json({message: `Delete Goals ${req.params.id}`})
 }
)


module.exports ={
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}

