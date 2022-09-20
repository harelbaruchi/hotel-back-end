const express = require("express");
const connection = require("../connection");
const router = express.Router();
const moment= require("moment");

let auth = require("../services/authentication");
let checkRole = require("../services/checkRole");
const { AddNewHotel, GetHotel, UpdateHotel, AddNewRoom, GetRoom } = require("./commonQueries");
const { Router } = require("express");


router.post("/Add", auth.authenticateToken, (req, res,next)=>{
    let room= req.body;
    let query= AddNewRoom;
    connection.query(query,
        [room.type,
        room.hotelId,
        room.availableCount],
        (err, result) => {
            if (!err) {
              return res
                .status(200)
                .json({ message: "Room added successfully" });
            } else {
              return res.status(500).json(err);
            }
          }
        ) 
});

router.patch('/update',auth.authenticateToken, (req,res,next)=>{
    let room= req.body;   
    const query= "update room set type=?,hotelId=?,availableCount=? where id=?";
    connection.query(query,[room.type,room.hotelId,room.availableCount,room.id],(err,results)=>{
        if(!err){
            if(results.affectedRows==0){
                return res.status(404).json({message: "room id was not found"})
            }
            return res.status(200).json({message: "room updated successfully"});
        }
        else{
            return res.status(500).json(err)
        }
    })
    
})


router.get('/get', auth.authenticateToken, (req, res) => {
    const query= GetRoom;
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err);

        }
    });
});

router.delete('/delete/:id', auth.authenticateToken, (req,res)=>{
    const id= req.params.id;
    const query="delete from room where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results.affectedRows==0){
                return res.status(404).json({message: "room id was not found"})
            }
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err)
        }
    })
})



module.exports=router;