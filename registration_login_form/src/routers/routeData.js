const express = require("express");
const router = new express.Router();
const Register = require("../models/registers")

router.get("/", (req, res) => {
    res.render("index");
    // res.send("Shabash beta!")
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
        // res.send(userEmail);
        // res.send(userEmail.password);
        // console.log(userEmail);

        if (userEmail.password === password) {
            res.status(201).render("loginSuccess")
        } else {
            res.send("Data not found")
        }

    } catch (error) {
        res.status(400).send("invalid entry!")
    }
})


module.exports = router;