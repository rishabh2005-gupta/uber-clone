const dotenv=require('dotenv')
dotenv.config()

const express=require('express')
const PORT=process.env.PORT || 3000
const app=require('./app')

app.listen(PORT ,()=>{
    console.log(`server is running on port ${PORT}`)
})