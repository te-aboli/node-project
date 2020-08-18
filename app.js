const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const userRoutes = require('./api/routes/users');
const homeRoutes = require('./api/routes/home');
const displayRoutes = require('./api/routes/display');
const addUserRoutes = require('./api/routes/addUser');
const updateRoutes = require('./api/routes/update');
const deleteRoutes = require('./api/routes/delete');





mongoose.connect(
    'mongodb+srv://aboli:'+
    process.env.MONGO_ATLAS_PW + 
    '@node-project.hsdux.mongodb.net/<dbname>?retryWrites=true&w=majority',
    {
        useNewUrlParser: true, 
      useUnifiedTopology: true 
    
    }
    );

//shows time required to get execute req.
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); //extract json data

//Prevents CORS Errors
app.use((req,res, next) =>
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Accesss-control-Allow-Headers", "Origin, X-Requested, Content-Type, Accept, Authorization");
    if(req.method === 'OPTIONS')
    {
        res.header('Access-Comtrol-Allow-Methods', 'PUT, POST PATCH, DELETE, GET');
        returnres.status(200).json({});
    }
    next();
})


//Routes
app.use('/users', userRoutes);
app.use('/home', homeRoutes);
app.use('/addUser', addUserRoutes);
app.use('/display', displayRoutes);
app.use('/update', updateRoutes);
app.use('/delete', deleteRoutes);





app.use((req,res,next) =>
{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);

});

app.use((error, req,res,next) => 
{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});


    module.exports = app;