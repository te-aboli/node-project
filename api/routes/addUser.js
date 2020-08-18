const express = require('express');
const { request } = require('../../app');
const router = express.Router();
const userModel= require('../models/user');
var path = require('path');
const mongoose = require('mongoose');


router.get('/', (req, res, next) =>
{
    console.log("Displays Forms");
    res.render(path.resolve('api/views/form.ejs'));
});

router.post('/', function(req, res, next){
    console.log(req.body);
 
    const  mybodydata = 
    {
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        comments: req.body.comments
    }
    var data = new  userModel(mybodydata);
    data.save( function(err)
    {
        if(err)
        {
            console.log(path.resolve('api/views/home.ejs')); 
            res.render(path.resolve('api/views/index.ejs'), {message: 'User not Registered'});
        } else
        {
            res.render(path.resolve('api/views/form.ejs'), {message:'User Registered'});
        }
    });
 });

// router.post('/', (req, res, next) =>
// {
//     res.status(201).json({
//         message: 'New User created'
//     });
// });

router.get('/:addUserID', (req, res, next) =>
{
        res.status(200).json({
            message: 'User Details',
            adduserID: req.params.addUserID
        });
});

router.delete('/:addUserID', (req, res, next) =>
{
    user.remove({ _id: req.body.id }, function(err) {
        if (!err) {
                message.type = 'User Deleted';
        }
        else {
                message.type = 'error';
        }
    });    
    res.status(201).json({
            message: 'User Deleted',
            adduserID: req.params.addUserID
        });
});



module.exports = router;