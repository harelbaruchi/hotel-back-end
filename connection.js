const mysql= require('mysql2');
require('dotenv').config();

const connection=  mysql.createConnection({
    host:process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    database: process.env.HOTELS_DB,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})

connection.connect((err)=>{
    if(err){
        console.log(err)
    }else {
        console.log('connected');
    }
    })




module.exports= connection;