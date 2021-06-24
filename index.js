const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const app = express();

app.set("view engine", "ejs");
app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render("todo");
});

app.post('/', (req, res) => {
    console.log(req.body);
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});