const express = require("express");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
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

mongoose.set("useFindAndModify", false);
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log('Mongo is connected');
    app.listen(3000, () => {
        console.log("Listening on port 3000");
    });
})
