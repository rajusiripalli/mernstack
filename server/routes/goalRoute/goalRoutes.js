const express = require('express');
const {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
} = require('./goalController');

const goalRouter = express.Router();

goalRouter.route('/').get(getGoals).post(setGoals)
goalRouter.route('/:id').put(updateGoals).delete(deleteGoals)

// goalRouter.get('/', getGoals)
// goalRouter.post('/', setGoals)
// goalRouter.put('/:id', updateGoals)
// goalRouter.delete('/:id', deleteGoals) 

module.exports = goalRouter;