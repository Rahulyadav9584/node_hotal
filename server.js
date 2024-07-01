const express=require('express');
const app=express();
const db=require('./db.js');

require('dotenv').config();
const PORT=process.env.PORT || 3000;

const bodyParser=require('body-parser');
app.use(bodyParser.json());//req.body


app.get('/',(req,res)=>{
    res.send('hi everyone from rahul yadav');
})


 // import the routerfiles
 const personRoutes=require('./routes/personRoutes.js')
 const itemsRoutes=require('./routes/itemsRoutes.js')
 // use the routers
 app.use('/person',personRoutes);
 app.use('/menuItem',itemsRoutes);


app.listen(PORT,()=>{
    console.log('server started');
})