const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()


const dbConnect = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    })
         console.log(
      `MongoDB connected: ${mongoose.connection.host}`
    );
        console.log("your database is connected ")
    }catch(error){
        console.log(error.message)
        process.exit(1)
    }
}

module.exports=dbConnect