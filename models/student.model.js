'use strict';

var mongoose = require("mongoose");
const { stringify } = require("uuid");
const bcrypt = require("bcrypt");
var Schema = mongoose.Schema;

var studentSchema = new Schema({

    student_name: String,
    student_surname: String,
    student_email: String,
    student_password: String,
    student_phoneNumber: String

});

studentSchema.pre("save", async function (next) {

    if (!this.isModified("student_password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.student_password, salt);
        this.student_password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
    
});

module.exports.Student = mongoose.model("Students", studentSchema);