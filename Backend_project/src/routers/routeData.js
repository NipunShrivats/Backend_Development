const express = require("express");
const router = new express.Router();
const User = require("../models/usermessage");

router.get("/", (req, res) => {
    res.render("home");
})
router.get("/home", (req, res) => {
    res.render("home");
})
router.get("/about", (req, res) => {
    res.render("about");
})
router.get("/services", (req, res) => {
    res.render("services");
})
router.get("/contact", (req, res) => {
    res.render("contact");
})
router.post("/contact", async (req, res) => {
    try {
        // res.send(req.body);
        // console.log(req.body);
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("home");
    } catch (err) {
        res.status(500).send(err);
    }
})

router.get("/gallery", (req, res) => {
    res.render("gallery");
})

module.exports = router; 