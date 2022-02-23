const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const routes = require('./routes/indexRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

// initiate MongoDB Connection
const connectDB = require('./config/db');
connectDB();

const app = express();

const port = process.env.PORT || 5000;

// middleware
// takes jsondata from any request and converts it to javascript object
// allow us to use req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

// asyncHandler gonna use errorHandler middleware that we made if there's an error thrown
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
