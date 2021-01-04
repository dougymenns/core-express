const express = require("express");
const path = require("path");
const app = express();
const route = require('./routes/api/members')
const logger = require("./middleware/logger");

//init body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//init middleware
app.use(logger);

//SET STATIC FOLDER
app.use(express.static(path.join(__dirname, "public")));

//member api routes
app.use('/api/members', route)

const PORT = process.env.PORT || 5002;

app.listen(PORT, console.log(`server started on port ${PORT}`));
