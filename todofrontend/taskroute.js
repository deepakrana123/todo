const Task = require("./model.js");
const express = require("express");

const router = express.Router()




router.post("/save-todo", async(req,res)=>{
    try{
           const task = await new Task(req.body).save();
           res.status(201).json({success:true,task})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err,message:"something going wrong"})
    }
})


router.get("/get-todo", async(req,res)=>{
    
    try{
        const task =await Task.find();
        res.status(200).json({success:true,task})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err,message:"somethink went wrong"})
    }
});


router.delete("/delete-todo/:id", async(req,res)=>{
    console.log(req.params.id,"id")
    try{
           const task= await Task.findById(req.params.id);
        if(!task){
            res.status(401).json({message:"task is not there"})
        }
        await task.remove();
        res.status(200).json({success:true,message:"todo successfully deleted"});


    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err,message:"error is there"})
    }
});

router.post("/update-todo", async(req,res)=>{
    try{
      const  {_id,task } = req.body
        console.log(_id , task)
        const value = await Task.findByIdAndUpdate(_id,{task});

        res.status(200).json({success:true,message:"updated successfully" ,value})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err,message:"error is there"})
    }
});

module.exports = router;