const express = require("express");
const connection = require("../connection");
const router = express.Router();
let auth = require("../services/authentication");
let checkRole = require("../services/checkRole");

router.get('/details',auth.authenticateToken,(req,res,next)=>{
    let projectCount;
    let commentCount;
    let query=" select count(id) as projectCount from project";
    connection.query(query,(err,results)=>{
        if(!err){
            projectCount= results[0].projectCount;
        }
        else{
            return res.status(500).json(err)
        }
    })
     query= "select count(id) as commentCount from comment";
     connection.query(query,(err,results)=>{
        if(!err){
            commentCount= results[0].commentCount;
            let data={
                project: projectCount,
                comment: commentCount
            }
            return res.status(200).json(data);
        }
        else{
            return res.status(500).json(err)
        }
     })

})

module.exports= router;