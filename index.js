const express= require('express');
let cors= require('cors');
const connection= require('./connection');
const userRoute= require('./routes/user');
const projectRoute= require('./routes/project');
const commentRoute=require('./routes/comment');
const dashboardRoute= require('./routes/dashboard')
const app= express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/user',userRoute);
app.use('/project',projectRoute);
app.use('/comment', commentRoute);
app.use('/dashboard', dashboardRoute)


module.exports= app;