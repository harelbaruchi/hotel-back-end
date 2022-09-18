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
  connection.query(
    query,
    [
      reservation.roomId,
      reservation.inbound,
      reservation.outbound,
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

module.exports = router;
