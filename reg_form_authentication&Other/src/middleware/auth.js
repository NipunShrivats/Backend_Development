const jwt = require("jsonwebtoken");
const Register = require("../models/registers");

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token_;
        const verifyUser = jwt.verify(token, process.env.MY_KEY);

        const user = await Register.findOne({ _id: verifyUser._id })
        console.log(user);
        console.log(user.firstName);

        req.token = token;
        req.user = user;

        next();
    } catch (err) {
        res.status(401).send(err)
    }
}

module.exports = auth;
