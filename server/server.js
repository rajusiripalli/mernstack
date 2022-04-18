const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const goalRouter = require('./routes/goalRoute/goalRoutes');
const {errorHandler} = require('./middleware/errorMiddleware');

const PORT  =  process.env.PORT || 5000

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/goals', goalRouter);
app.use(errorHandler);



mongoose.connect('mongodb+srv://raju:raju@cluster0.9hka3.mongodb.net/myFirstTestDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Database connected");
}).catch(err => {
    console.log(err);
})


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})