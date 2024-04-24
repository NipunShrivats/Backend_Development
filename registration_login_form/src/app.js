const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");//handlebars
const PORT = process.env.PORT || 8000;
require("./db/conn");

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

app.listen(PORT, () => {
    console.log(`server is running at port no ${PORT}`);
})