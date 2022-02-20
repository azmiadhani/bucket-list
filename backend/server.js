const express = require("express");
const dotenv = require("dotenv").config();
const routes = require("./routes/indexRoutes");

const app = express();

const port = process.env.PORT || 5000;

app.use(routes);

app.listen(port, () => console.log(`Server started on port ${port}`));
