//const user = require("../models/user");
const express = require('express');
const router = express.Router();
var path = require('path');
const userModel= require('../models/user');
var path = require('path');
const mongoose = require('mongoose');

router.get('/:id' , function(req,res)
{   
    var id = req.params.id;
    
    userModel.findById(id, function(err,User)
    {
        if(err)
        {
            console.log(err);
        } else{

             res.render(path.resolve('api/views/update.ejs'), { User : User});
             //console.log("Shows Users",User);
        }
    })
   
    //res.render(path.resolve('api/views/update.ejs'), { User : User});
});

router.post('/:id', function(req, res)
{
    console.log("Inside the box")
    console.log("My ID:"+ req.params.id);

    const mybodydata =
    {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        comments: req.body.comments
    }
    userModel.findByIdAndUpdate(req.params.id, mybodydata, function(err)
    {
        if(err)
        {
            res.render(path.resolve('api/views/update/') + req.params.id);
            
        }
        else
        {
            res.redirect('../display');
        }
    });
});


module.exports = router;