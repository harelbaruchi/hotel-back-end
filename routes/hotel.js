const express = require("express");
const connection = require("../connection");
const router = express.Router();
const moment= require("moment");

let auth = require("../services/authentication");
let checkRole = require("../services/checkRole");
const { AddNewHotel, GetHotel, UpdateHotel } = require("./commonQueries");
const { Router } = require("express");

router.post("/Add", auth.authenticateToken, (req, res,next)=>{
    let hotel= req.body;
    let query= AddNewHotel;
    connection.query(query,
        [hotel.name,
        hotel.address,
        hotel.image],
        (err, result) => {
            if (!err) {
              return res
                .status(200)
                .json({ message: "Hotel added successfully" });
            } else {
              return res.status(500).json(err);
            }
          }
        ) 
});



router.get('/get', auth.authenticateToken, (req, res) => {
    const query= GetHotel;
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
    let hotel= req.body;
    const query =UpdateHotel;
    connection.query(query, [hotel.name,hotel.address,hotel.image,hotel.id], (err, results) => {
        if(!err){
            if(results.affectedRows==0){
                return res.status(404).json({message: "hotel id does not found"});
            }
            return res.status(200).json({message:"hotel updated successfully"});
        }else {
            return res.status(500).json(err);
        }
    })
})




module.exports=router;