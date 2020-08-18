//const { users } = require("../../app");
const user = require("../models/user");
const express = require('express');
const router = express.Router();
var path = require('path');
//const mongoose = require('mongoose');


router.get('/', function(req, res, next)
{
    console.log("Displays User");
    res.render(path.resolve('api/views/index.ejs'));
   
});



module.exports = router;

