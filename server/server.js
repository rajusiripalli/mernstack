const express = require('express');
const dotenv = require('dotenv').config();
const goalRouter = require('./routes/goalRoute/goalRoutes');
const {errorHandler} = require('./middleware/errorMiddleware');

const PORT  =  process.env.PORT || 5000

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/goals', goalRouter);
app.use(errorHandler);



app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})