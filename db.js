const mongoose=require('mongoose');

// Define the MongoDB connection URL
const mongoUrl='mongodb://localhost:27017/hotals' //hotals is database name

//Set Up mongoDB connection
mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

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