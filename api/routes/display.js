//const { users } = require("../../app");
//const user = require("../models/user");
const express = require('express');
const router = express.Router();
var path = require('path');
const userModel= require('../models/user');
var path = require('path');
const mongoose = require('mongoose');

router.get('/', function(req, res, next)
{
    console.log("Displays User");
     //res.render(path.resolve('api/views/index.ejs'));
    userModel.find(function(err,User)
    {
        if(err)
        {
            console.log(err);
        } else{
             res.render(path.resolve('api/views/display.ejs'), { User : User});
            //console.log("Shows Users",User);
        }
    })
   
});


module.exports = router;
