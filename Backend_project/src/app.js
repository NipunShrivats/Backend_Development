const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");
const PORT = process.env.PORT || 8000;

// 
app.use(express.json()) // to accept data in json
app.use(express.urlencoded({ extended: false })) // to decode data through html form

// getting router
const dataRouter = require("./routers/routeData");
app.use(dataRouter);

// database
require("./db/conn")

//initializing templates path - views & partials
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.set("view engine", "hbs");

//static app
app.use(express.static("public"));

// bootstrap
app.use("/css", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use("/jq", express.static(path.join(__dirname, "../node_modules/jquery/dist")));



app.listen(PORT, () => {
    console.log(`Listening on port no. ${PORT}`);
})