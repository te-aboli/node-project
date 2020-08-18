//const user = require("../models/user");
const express = require('express');
const router = express.Router();
var path = require('path');
const userModel= require('../models/user');
var path = require('path');
const mongoose = require('mongoose');

router.get('/:id', function(req, res)
{
    console.log("Inside the box")
    console.log("My ID:"+ req.params.id);


    userModel.findByIdAndDelete(req.params.id, function(err)
    {
        if(err)
        {
            res.render(path.resolve('api/views/display'));
            
        }
        else
        {
            res.redirect('../display');
        }
    });
});


module.exports = router;