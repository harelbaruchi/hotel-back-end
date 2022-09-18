const express= require('express');
let cors= require('cors');
const connection= require('./connection');
const userRoute= require('./routes/user');


const dashboardRoute= require('./routes/dashboard')
const hotelRoute= require('./routes/hotel');
const roomRoute= require('./routes/room');
const reservationRoute= require('./routes/reservation');
const app= express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/user',userRoute);

app.use('/dashboard', dashboardRoute)
app.use('/hotel', hotelRoute);
app.use('/room', roomRoute);
app.use('/reservation', reservationRoute);


module.exports= app;