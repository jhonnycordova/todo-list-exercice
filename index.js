const express = require("express");
// const dotenv = require('dotenv');

// dotenv.config();
const app = express();

var Datastore = require('nedb');
var db = new Datastore({filename:'./data/database'});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/tasks', (req, res) => {
    db.find({}).sort({order: 1}).exec(function(err, records) {
        res.status(200).json({
            message: "Task listed!",
            tasks: records 
        });
    });
});

app.post('/tasks', (req, res) => {
    const task = { name: req.body.name, order: ''};
    db.count({}, function (err, count) {
        task.order = count + 1;
    });
    db.insert(task, (err, record) => {
        res.status(200).json({
           message: "Task created!",
           task: record 
        });
    })
});

app.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    db.remove({ _id: taskId }, {}, function (err, numRemoved) {
        res.status(200).json({
            message: "Task removed!",
        });
    });
});

app.put('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const task = { name: req.body.name };
    db.update({ _id: taskId }, task, {}, function () {
        res.status(204).json({
            message: "Task updated!",
        });
    });
});

app.patch('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    db.update({ _id: taskId }, { $set: { order: req.body.order } }, {}, function () {
        res.status(204).json({
            message: "Task updated!",
        });
    });
});

db.loadDatabase(function (err) {
    app.listen(3000, () => {
        console.log("Listening on port 3000");
    });
});

