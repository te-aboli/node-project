const mongoose = require('mongoose');
const express = require('express');
const app = express();
const userSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        email: String,
        phone:Number,
        comments: String
    }
);


module.exports = mongoose.model('User',userSchema);