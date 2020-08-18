const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

//console.log(__dirname);
router.get('/', (req,res, next) =>
{
    User.find().exec().then(docs => {
        console.log(docs);
        //if(docs.length >= 0)
        {
            res.status(200).json(docs);
        }
        // else{
        //     res.status(404).json({
        //         message: 'No entries Found'
        //     });
        // }
    })
});

router.post('/', (req,res, next) =>
{
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        comments: req.body.comments
    }) ;
    user.save().then (result =>
        {
            console.log(result);
            res.status(201).json({})
        })
        .catch(err => console.log(err));
    res.status(201).json(
        {
            message: 'Handling POST Request to /users',
            createUser: user
        }
    );
});


router.get('/:userId', (req, res, next) =>
{
    const id = req.params.userId;
    User.findById(id)
    .exec().then(doc => {
        console.log("From Database",doc);
        res.status(200).json(doc);
    })
    .catch(err =>  {
        console.log(err);
        res.status(500).json({error:err});
    });
    
});
    


router.patch('/:userID', (req, res, next) =>
{
   const id = req.params.userID;
   const updateOps ={}; 
   for (const ops of req.body)
   {
       updateOps[ops.propName] = ops.value;
   }
   User.update({_id: id}, { $set: updateOps })
   .exec()
   .then(result => {
    console.log(result);
    res.status(200).json(result);
   })
   .catch(err => {
    connsole.log(err);
    res.status(500).json({
        error: err
    })
})

});


router.delete('/:userID', (req, res, next) =>
{
    const id = req.params.userID;
    User.remove({_id : id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        connsole.log(err);
        res.status(500).json({
            error: err
        })
    })
});


router.get( '/home', function(req, res){
    console.log("This shows Home Page");
});

module.exports = router;