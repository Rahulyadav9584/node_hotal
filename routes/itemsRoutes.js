const express=require('express');
const router=express.Router();

const MenuItem=require('../model/menu');

 // for menu Post
 router.post('/',async(req,res)=>{
    try {
        const data=req.body;

        const newItem=new MenuItem(data);
        const response=await newItem.save();
        console.log('data saved');
      res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
        
    }
  })

  
// Get method to get the menu
 router.get('/',async(req,res)=>{
    try {
        const data=await MenuItem.find();
        console.log('data fetch');
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
 })

 router.get('/:taste',async(req,res)=>{
    try{
        const taste=req.params.taste; //extract the workType from the Url Parameter
        if(taste=='sweet' || taste=='spicy' || taste=='sour'){
            const response= await MenuItem.find({taste:taste});
            console.log('response fetched');
            res.status(200).json(response);
        }
        else{
            res.status(400).json({error:'Invalid Work Type'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({err: 'Internal Server Error'});
    }
 })
  router.put('/:id',async(req,res)=>{
    try {
        const itemId=req.params.id; //extract the id from the url parameter
        const updatedItemData=req.body; //updated data for the person

        const response=await MenuItem.findByIdAndUpdate(itemId,updatedItemData,{
            new:true, //return the updated document
            runValidators:true //run moongoose validator
        })
        if(!response){
            return res.status(404).json({error:'item not found'});
        }

        console.log('data updated');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({err: 'Internal Server Error'});
    }
 })

 router.delete('/:id',async(req,res)=>{
  try {
    const itemId=req.params.id;

    //assuming you have a person modal

    const response=await MenuItem.findByIdAndDelete(itemId);
    if(!response){
        return res.status(404).json({error:'person not found'});
    }

    console.log('data deleted');
        res.status(200).json();
 }
   catch (err) {
    console.log(err);
        res.status(500).json({err: 'Internal Server Error'});
  }
})

 module.exports=router;