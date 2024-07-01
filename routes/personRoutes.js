const express=require('express');
const router=express.Router();
const Person=require('../model/person')

//Post route to add a person
router.post('/',async(req,res)=>{
    try{
     const data=req.body; //Assuming the request body contains the person data
 
     // create a new person document using the mongoose model
     const newPerson=new Person(data);
 
    // Save the new Person to the Database
       const response=await newPerson.save();
       console.log('data saved');
       res.status(200).json(response);
    }
    catch(error){
      console.log(error);
      res.status(500).json({error: 'Internal Server Error'});
    }
    
 })

 // Get method to get the person
 router.get('/',async(req,res)=>{
    try {
        const data=await Person.find();
        console.log('data fetch');
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
 })

 router.get('/:workType',async(req,res)=>{
    try{
        const workType=req.params.workType; //extract the workType from the Url Parameter
        if(workType =='chef' || workType =='manager' || workType=='waiter'){
            const response= await Person.find({work:workType});
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
        const personId=req.params.id; //extract the id from the url parameter
        const updatedPersonData=req.body; //updated data for the person

        const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true, //return the updated document
            runValidators:true //run moongoose validator
        })
        if(!response){
            return res.status(404).json({error:'person not found'});
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
    const personId=req.params.id;

    //assuming you have a person modal

    const response=await Person.findByIdAndDelete(personId);
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