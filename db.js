const mongoose=require('mongoose');
require('dotenv').config();
// Define the MongoDB connection URL
const DB_URL1=process.env.DB_URL1;
const mongoUrl=DB_URL1; //hotals is database name
//const mongoUrl=;// online server


//Set Up mongoDB connection
mongoose.connect(mongoUrl)

// get the default connection
//Mongoose maintain a default connection object representing the mongoDb connection
const db=mongoose.connection;

// define event listener for database connection
db.on('connected',()=>{
    console.log('connected to mongoDb server');
})

db.on('error',(err)=>{
    console.log('MongoDb connection error:',err);
})


db.on('disconnected',()=>{
    console.log('disconnected to mongoDb server');
})


// export the database connection
module.exports=db; 