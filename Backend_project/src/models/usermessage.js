const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email id")
            }
        }
    },
    phone: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
})


const User = new mongoose.model("User", userSchema);

module.exports = User;