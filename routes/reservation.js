const express = require("express");
const connection = require("../connection");
const router = express.Router();
const moment = require("moment");

let auth = require("../services/authentication");
let checkRole = require("../services/checkRole");
const { AddNewReservation, GetReservation } = require("./commonQueries");
const { Router } = require("express");

router.post("/Add", auth.authenticateToken, (req, res, next) => {
  let reservation = req.body;
  let query = AddNewReservation;
let mysqlTimeStart=moment().format(reservation.inbound,"YYYY-MM-DD");
let mysqlTimeEnd=moment().format(reservation.outbound,"YYYY-MM-DD"); 
  connection.query(
    query,
    [
      reservation.roomId,
      mysqlTimeStart,
      mysqlTimeEnd,
      reservation.personFName,
    ],
    (err, result) => {
      if (!err) {
        return res.status(200).json({ message: "Booking added successfully" });
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

router.patch('/update', auth.authenticateToken, (req,res,next)=>{
    let reservation= req.body;
    let mysqlTimeStart=moment().format(reservation.inbound,"YYYY-MM-DD");
let mysqlTimeEnd=moment().format(reservation.outbound,"YYYY-MM-DD"); 
    const query= "update reservation set inbound=?,outbound=?,roomId=?,personFName=? where id=?";
    connection.query(query,[mysqlTimeStart,mysqlTimeEnd,reservation.roomId,reservation.personFName,reservation.id],(err,results)=>{
        if(!err){
            if(results.affectedRows==0){
                return res.status(404).json({message: "booking id was not found"})
            }
            return res.status(200).json({message: "booking updated successfully"});
        }
        else{
            return res.status(500).json(err)
        }
    })
})

router.get('/get', auth.authenticateToken,(req,res)=>{
    let query= GetReservation;
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err);

        }
    })
})

router.delete('/delete/:id', auth.authenticateToken, (req,res)=>{
    const id= req.params.id;
    const query="delete from reservation where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results.affectedRows==0){
                return res.status(404).json({message: "booking id was not found"})
            }
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err)
        }
    })
})


module.exports = router;
