const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const employeeSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// generating tokens
employeeSchema.methods.generateAuthToken = async function () {
    try {
        const token_ = await jwt.sign({ _id: this._id.toString() }, process.env.MY_KEY); //1st converted to string as it is in object
        console.log(token_);

        //concat token_//
        this.tokens = this.tokens.concat({ token: token_ });
        await this.save();

        return token_;

    } catch (error) {
        res.send(`The error part: ${error}`);
        console.log(`The error part: ${error}`);
    }
}
// for hashing poasswords and do not use arrow function//
employeeSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        console.log(`password:- ${this.password}`)
        this.password = await bcrypt.hash(this.password, 10)
        console.log(`password:- ${this.password}`)
        // this.confirmPassword = undefined;
    }
    next()//
})

const Register = new mongoose.model("Register", employeeSchema);

module.exports = Register;