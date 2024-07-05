const express=require('express');
const app=express();
const db=require('./db.js');
const passport=require('./auth.js')

require('dotenv').config();
const PORT=process.env.PORT || 3000;



// Middleware Function
const logRequest=(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next();//move to the next phase
}



const bodyParser=require('body-parser');
app.use(bodyParser.json());//req.body


app.use(passport.initialize());
const localAuthMiddleware=passport.authenticate('local',{session:false});


app.get('/',(req,res)=>{
    res.send('hi everyone from rahul yadav');
})


 // import the routerfiles
 const personRoutes=require('./routes/personRoutes.js')
 const itemsRoutes=require('./routes/itemsRoutes.js')
 // use the routers
 app.use('/person',localAuthMiddleware,personRoutes);
 app.use('/menuItem',itemsRoutes);


app.listen(PORT,()=>{
    console.log('server started');
})