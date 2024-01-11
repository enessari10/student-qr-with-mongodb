'use strict';

var mongoose = require("mongoose");
const { stringify } = require("uuid");
const bcrypt = require("bcrypt");
var Schema = mongoose.Schema;

var lecturesSchema = new Schema({

    student_id: String,
    student_name: String,
    student_surname: String,
    teacher_id: String,
    teacher_name: String,
    teacher_surname: String,
    lecture_name: String,
    lecture_subject: String,
    lecture_desc: String,
    lecture_time: Date,
    studentDidCome: Boolean
    
});


module.exports.Lectures = mongoose.model("Lectures", lecturesSchema);