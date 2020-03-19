const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose');

const userRoutes = require('./api/routes/users')
const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')
const app = express()

//connection with local mongoDB
const dbUrl = 'mongodb://localhost/yakyik'
mongoose.connect(dbUrl, 
function(err,res){
    if(err){
        console.log('DB connection failed' + err)
    }else{
        console.log('DB connection successful'+ dbUrl)
    }
})

/*connectipon with the atlass db

mongoose.connect( 'the url from mongo atlass',{
    useMongoClient: true
})
note
{ 
    "env":{
        "mong-atlass-pw":'the password key'
    }
}
*/
mongoose.Promise = global.Promise;
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/uploads',express.static('uploads'))


app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-headers','*');

    if (req.method === 'OPTIONS') {
        Res.header('Access-Control-Allow-Methods',
        'PUT,DELETE,GET,PATCH,POST')
        return res.status().json({});
    }
    next();
});


//routes
app.use('/products',productRoutes)
app.use('/orders',orderRoutes)
app.use('/users',userRoutes)

app.use((req,res,next)=>{
    const error = new Error('not found');
   error.status = 404;
   next(error) 
       
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message:error.message
        }
    })
})
module.exports= app;
