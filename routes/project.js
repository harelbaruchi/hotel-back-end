const express = require("express");
const connection = require("../connection");
const router = express.Router();
let auth = require("../services/authentication");
let checkRole = require("../services/checkRole");
const { AddNewProject, UpdateProject } = require("./commonQueries");


router.post(
  "/add",
  auth.authenticateToken,
  checkRole.checkRole,
  (req, res, next) => {
    let project = req.body;
    let query =
      AddNewProject;
    connection.query(
      query,
      [
        project.name,
        project.address,
        project.image,
        project.status,
        project.endDate,
      ],
      (err, result) => {
        if (!err) {
          return res
            .status(200)
            .json({ message: "project added successfully" });
        } else {
          return res.status(500).json(err);
        }
      }
    );
  }
);

router.get('/get', auth.authenticateToken,(req,res,next)=>{
    const query= "select *from project order by name";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err);

        }
    });
});


router.patch('/update',auth.authenticateToken, (req,res,next) =>{
    let project= req.body;
    const query =UpdateProject;
    connection.query(query, [project.name,project.address,project.image,project.status,project.endDate,project.id], (err, results) => {
        if(!err){
            if(results.affectedRows==0){
                return res.status(404).json({message: "project id does not found"});
            }
            return res.status(200).json({message:"project updated successfully"});
        }else {
            return res.status(500).json(err);
        }
    })
})

module.exports=router;