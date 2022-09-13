const express = require("express");
const connection = require("../connection");
const { AddUserQuery, ExistingEmailQuery } = require("./commonQueries");
const router = express.Router();

const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { Router } = require("express");
require("dotenv").config();
const auth = require("../services/authentication");
const checkRole = require("../services/checkRole");

router.post("/signup", (req, res) => {
  let user = req.body;
  query = AddUserQuery;
  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        //if user already signed up with that email
        query = ExistingEmailQuery;
        connection.query(
          query,
          [user.name, user.contactNumber, user.email, user.password],
          (err, results) => {
            if (!err) {
              return res
                .status(200)
                .json({ message: "successfully registered" });
            } else {
              return res.status(500).json(err);
            }
          }
        );
      } else {
        return res.status(400).json({ message: "email already exist" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.post("/login", (req, res) => {
  const user = req.body;
  query = AddUserQuery;
  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results.length <= 0 || results[0].password != user.password) {
        return res.status(401).json({ message: "Incorrect user or password" }); //failing attempt to login
      } else if (results[0].status === "false") {
        return res.status(401).json({ message: "Wait for Admin approval" }); //successfully logged in pending admin approval
      } else if (results[0].password == user.password) {
        const response = { email: results[0].email, role: results[0].role };
        const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, {
          expiresIn: "4h",
        });
        res.status(200).json({ token: accessToken });
      } else {
        return res
          .status(400)
          .json({ message: "something went wronf please try again later" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

router.post("/forgotPassword", (req, res) => {
  const user = req.body;
  query = "select email,password from user where email=?";
  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        return res
          .status(200)
          .json({ message: "password sent successfully to your email." });
      } else {
        let mailOptions = {
          from: process.env.EMAIL,
          to: results[0].email,
          subject: "Password Reset projects management site",
          html:
            "<p><b>your Login Details</b><br><b>Email:</b>" +
            results[0].email +
            "<br><b>Password: </b>" +
            results[0].password +
            '<br><a href="http://localhost:4200/">click here to login</a></p>',
        };
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        return res
          .status(200)
          .json({ message: "password sent successfully to your email." });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get("/get", auth.authenticateToken, checkRole.checkRole, (req, res) => {
  const query =
    "select id,name,email,contactNumber,status from user where role='user'";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

router.patch(
  "/update",
  auth.authenticateToken,
  checkRole.checkRole,
  (req, res) => {
    let user = req.body;
    const query = "update user set status=? where id=?";
    connection.query(query, [user.status, user.id], (err, results) => {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).json({ message: "user id does not exits" });
        }
        return res.status(200).json({ message: "User updated successfully" });
      } else {
        return res.status(500).json(err);
      }
    });
  }
);

router.get("/checkToken", auth.authenticateToken, (req, res) => {
  return res.status(200).json({ message: "true" });
});

/**
 * change password
 */

router.post("/changePassword",auth.authenticateToken,(req, res) => {
  const user = req.body;
  const email = res.locals.email;
  let query = "select * from user where email=? and password=?";
  connection.query(query, [email, user.oldPassword], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        return res.status(400).json({ message: "Incorrect old password" });
      } else if (results[0].password == user.oldPassword) {
        query = "update user set password=? where email=?";
        connection.query(query, [user.newPassword, email], (err, results) => {
          if (!err) {
            return res
              .status(200)
              .json({ message: "password updated successfully." });
          } else {
            return res.status(500).json(err);
          }
        });
      } else {
        return res
          .status(400)
          .json({ message: "something went wrong. please try again later" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;
