const express = require("express");
const router = new express.Router();
const Register = require("../models/registers")
const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken");
// const cookieParser = require('cookie-parser')
const auth = require("../middleware/auth");

router.get("/", (req, res) => {
    res.render("index");
    // res.send("Shabash beta!")
})
router.get("/secret", auth, (req, res) => {
    // console.log(`this is the cookie: ${req.cookies.token_}`)
    res.render("secret");
})
// ---------------------------------------------
// register // 
router.get("/register", (req, res) => {
    res.render("registerPage");
    // res.send("register!")
})
router.post("/register", async (req, res) => {
    try {
        console.log(req.body);
        const password = req.body.password;
        const cpassword = req.body.confirmPassword;

        if (password === cpassword) {
            const registerEmployee = new Register({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone,
                age: req.body.age,
                gender: req.body.gender,
                email: req.body.email,
                password: password,
                confirmPassword: cpassword,
            })

            // middleware hashing
            // implemented in schema

            // ----------------
            // authentication tokens middleware
            const token = await registerEmployee.generateAuthToken()
            console.log("Token:-> ", token);

            // --------------------------
            // res.cookie() function is used to set the cookie name to value.
            // The value parameter may be a string or object converted to JSON.
            // res.cookie('token', token)
            res.cookie('token_', token, {
                expires: new Date(Date.now() + 600000),
                httpOnly: true
            });
            console.log(`cookie:- ${cookie}`);
            // --------------------------

            const registered = await registerEmployee.save();
            res.status(201).render("Rsuccess");
        } else {
            res.send("Passwords are not matching");
        }
    } catch (error) {
        res.status(400).send(error);
    }
})
// ---------------------------------------------
// login //
router.get("/login", (req, res) => {
    res.render("loginPage");
    // res.send("login!")
})
router.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        console.log(`${email} & ${password}`);

        const userEmail = await Register.findOne({ email: email });
        const isMatch = await bcrypt.compare(password, userEmail.password)
        console.log("isMatch", isMatch)
        // ----------------
        const token = await userEmail.generateAuthToken()
        console.log("token:-> ", token);
        res.cookie('token_', token, {
            expires: new Date(Date.now() + 600000),
            httpOnly: true
        });


        if (isMatch) {
            res.status(201).render("loginSuccess")
        } else {
            res.send("Data not found")
        }

    } catch (error) {
        res.status(400).send("invalid entry!")
    }
})

router.get("/logout", auth, async (req, res) => {

    try {
        // 1. for singe user
        // req.user.tokens = req.user.tokens.filter((currentElement) => {
        //     return currentElement.token != req.token;
        // })

        // 2. 
        req.user.tokens = [];

        res.clearCookie("token_");
        await req.user.save();
        res.render("loginPage");
        console.log(`${req.user.firstName} is Logged out!`)
    } catch (err) {
        res.status(500).send(err);
    }

})


module.exports = router;