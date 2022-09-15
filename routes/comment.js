const express = require("express");
const connection = require("../connection");
const router = express.Router();
const moment= require("moment");

let auth = require("../services/authentication");
let checkRole = require("../services/checkRole");
const { AddNewComment } = require("./commonQueries");


router.post('/add',auth.authenticateToken,(req,res)=>{
    let comment= req.body;
    const query= AddNewComment;
    let mySqlDate =moment().format(comment.timeCreated,"YYYY-MM-dd");
    connection.query(query,[comment.description,comment.projectId,mySqlDate], (err, results)=>{
        if(!err){
            return res.status(200).json({message: "comment added successfully"});
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.get('/get', auth.authenticateToken,(req,res,next)=>{
    let query="select c.id,c.description,c.timeCreated,p.id as projectId,p.name as projectName from comment as c INNER JOIN project as p where c.projectId=p.id";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }else{
            return res.status(500).json(err);
        }
    })
})

router.get('/getByProject/:id',auth.authenticateToken,(req,res,next)=>{
    const id= req.params.id;
    const query= "select id,description,timeCreated from comment where projectId=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err)
        }
    })
})

router.get('/getById/:id', auth.authenticateToken,(req,res,next)=>{
    const id=req.params.id;
    const query="select id,description,timeCreated from comment where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            return res.status(200).json(results[0]);
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.patch('/update',auth.authenticateToken, (req,res,next)=>{
    let comment= req.body;
    let mySqlDate =moment().format(comment.timeCreated,"YYYY-MM-dd");   
    const query= "update comment set description=?,projectId=?,timeCreated=? where id=?";
    connection.query(query,[comment.description,comment.projectId,mySqlDate, comment.id],(err,results)=>{
        if(!err){
            if(results.affectedRows==0){
                return res.status(404).json({message: "comment id was not found"})
            }
            return res.status(200).json({message: "comment updated successfully"});
        }
        else{
            return res.status(500).json(err)
        }
    })
    
})

router.delete('/delete/:id', auth.authenticateToken,(req,res,next)=>{
    const id= req.params.id;
    const query= "delete from comment where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results.affectedRows==0){
                return res.status(404).json({message: "comment id was not found"})
            }
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err)
        }
    })
})

module.exports= router;