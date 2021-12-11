"use strict";
exports.__esModule = true;
var express_1 = require("express");
var users_1 = require("./users/users");
var port = 3000;
var app = express_1["default"]();
app.use(function (req, res, next) {
    console.log("time " + Date.now());
    next();
});
app.get('/hello', function (req, res) {
    throw new Error('Error!!!');
});
app.use('/users', users_1.userRouter);
app.use(function (err, req, res, next) {
    console.log(err.message);
    res.status(401).send(err.message);
});
app.listen(port, function () {
    console.log("server listening on http://localhost:" + port);
});
