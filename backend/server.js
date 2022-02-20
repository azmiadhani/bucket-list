const express = require("express");
const dotenv = require("dotenv").config();
const routes = require("./routes/indexRoutes");

const app = express();

const port = process.env.PORT || 5000;

// middleware
// takes jsondata from any request and converts it to javascript object
// allow us to use req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.listen(port, () => console.log(`Server started on port ${port}`));
