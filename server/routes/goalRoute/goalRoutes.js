const express = require('express');
const { protect } = require('../../middleware/authMiddleware');
const {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
} = require('./goalController');

const goalRouter = express.Router();

goalRouter.route('/').get(protect, getGoals).post(protect, setGoals)
goalRouter.route('/:id').put(protect, updateGoals).delete(protect, deleteGoals)

// goalRouter.get('/', getGoals)
// goalRouter.post('/', setGoals)
// goalRouter.put('/:id', updateGoals)
// goalRouter.delete('/:id', deleteGoals) 

module.exports = goalRouter;