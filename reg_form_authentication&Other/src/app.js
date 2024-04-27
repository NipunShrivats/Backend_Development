const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");//handlebars
require("./db/conn");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT || 8000;

// cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// initialization of templates path
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
app.use(express.static("public"))
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.set("view engine", "hbs");// template engine

// API middlewares
app.use(express.json()) // to accept data in json
app.use(express.urlencoded({ extended: false })) // to decode data through html form

// data router
const dataRouter = require("./routers/routeData")
app.use(dataRouter);


// -----------------------------------
//// bcryupt-example//
// const securePassword = async (password) => {
//     const passwordHash = await bcrypt.hash(password, 10);
//     console.log(passwordHash)

//     // compare passwords
//     const passwordCompare = await bcrypt.compare(password, passwordHash)
//     console.log(passwordCompare)
// }
// securePassword("superman")
// -----------------------------------

// jsonwebtoken -----------------------------------------------------//
// const createToken = async () => {

//     const token = await jwt.sign({ _id: "6628c8a640404f0c4310a532" }, "mynameisnipunandidonotwanttogotocollegetodaykukimeramannahihai", { expiresIn: "2 minutes" }) //2nd is secret key i.e min 32characters
//     console.log(token);

//     const userVer = await jwt.verify(token, "mynameisnipunandidonotwanttogotocollegetodaykukimeramannahihai");
//     console.log(userVer);
// }
// createToken()


app.listen(PORT, () => {
    console.log(`server is running at port no ${PORT}`);
})