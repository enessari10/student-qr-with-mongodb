'use strict';

require('dotenv').config({ path: '.env' });

const express = require("express");
const logger = require("morgan");
const jsonParser = require("body-parser").json;
const studentRoutes = require("./routes/students");
const lecturesRoutes = require("./routes/lectures");

var mongoose = require("mongoose");

const app = express();
app.use(logger("dev"));
app.use(jsonParser());


app.use('/students', studentRoutes);
app.use('/lectures', lecturesRoutes);

app.get('/', async (req, res) => {
    res.status(200).json("Hello, welcome Student QR");
});
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
var db = mongoose.connection;

db.on("error", function(err){
    console.error("Connection error: ", err);
});

db.once("open", function(){
    console.log("DB connection successfull!");
});

app.use(function(req, res, next) {

    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next){
    
    res.status(err.status || 500);

    return res.json({
        error: {
            message: err.message,
            code: err.code
        }
    });
});

var port = process.env.PORT || 8080;

app.listen(port, function() {
    console.log("Express server is listening in port ", port);
});