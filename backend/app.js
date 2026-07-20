const dotenv=require('dotenv')
dotenv.config()

const express=require('express')
const dbConnect=require('./config/dbConnect')
const cors=require('cors')
const userRoutes=require('./routes/user.routes')

const app=express()
app.use(cors())
dbConnect()
app.use(express.json());

app.use("/users", userRoutes);

module.exports=app
