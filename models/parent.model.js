const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const parentSchema = new Schema({
    parent_name: String,
    parent_surname: String,
    parent_email: String,
    parent_password: String,
    parent_phoneNumber: String
});
parentSchema.pre("save", async function (next) {
    if (!this.isModified("parent_password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        if (!this.parent_password || !salt) {
            throw new Error("Şifre ve salt değerleri gereklidir.");
        }
        const hashedPassword = await bcrypt.hash(this.parent_password, salt);
        this.parent_password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

module.exports.Parent = mongoose.model("Parent", parentSchema);
