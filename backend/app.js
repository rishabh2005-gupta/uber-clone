const dotenv=require('dotenv')
dotenv.config()

const express=require('express')
const dbConnect=require('./config/dbConnect')
const cors=require('cors')
const userRoutes=require('./routes/user.routes')
const cookieParser=require('cookie-parser')
const app=express()
dbConnect()

app.use(cors())
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

app.use("/users", userRoutes);

module.exports=app
