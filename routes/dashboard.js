const express = require("express");
const connection = require("../connection");
const router = express.Router();
let auth = require("../services/authentication");
let checkRole = require("../services/checkRole");

router.get('/details',auth.authenticateToken,(req,res,next)=>{
    let hotelCount;
    let roomCount;
    let reservationCount;
    let query=" select count(id) as hotelCount from hotel";
    connection.query(query,(err,results)=>{
        if(!err){
            hotelCount= results[0].hotelCount;
        }
        else{
            return res.status(500).json(err)
        }
    })
     query= "select count(id) as roomCount from room";
     connection.query(query,(err,results)=>{
        if(!err){
            roomCount= results[0].roomCount;
            // let data={  //dont return it here 
            //     project: projectCount,
            //     comment: commentCount
            // }
            // return res.status(200).json(data);
        }
        else{
            return res.status(500).json(err)
        }
     })
     query= "select count(id) as reservationCount from reservation"
     connection.query(query, (err, results)=>{
        if(!err){
            reservationCount= results[0].reservationCount;
            let data= {
                reservation: reservationCount,
                room: roomCount,
                hotel: hotelCount
            }
            return res.status(200).json(data);
        }else {
            return res.status(500).json(err);

        }
     })

})

module.exports= router;