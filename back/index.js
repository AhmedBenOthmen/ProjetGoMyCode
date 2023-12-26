// Create Server and connexion with Data Base 
const express = require ("express");
const mongosse = require('mongoose');
const dotenv =require("dotenv");
const cors = require("cors");
const bodyParser= require("body-parser");
const cookieParser = require('cookie-parser')
const jobRoute = require('./routes/job.js')
const userRoute = require('./routes/user.js')
const authRoute = require('./routes/auth.js')
const commentRoute = require('./routes/comment.js')

dotenv.config();
const app = express();
const server = process.env.SERVER;
const PORT = process.env.PORT || 4000
const DB = process.env.DB


app.use(bodyParser.json())
app.use(cors());
app.use(cookieParser())

// connexion to our DB , MongoDB
mongosse.connect(`${server}/${DB}` , {useNewUrlParser:true, useUnifiedTopology:true})
   .then(()=> console.log("DB CONNECTED DONE"))
   .catch((err)=>console.error("DB not connected",err))




app.use('/job',jobRoute)
app.use('/user',userRoute)
app.use('/auth',authRoute)
app.use('/comment',commentRoute)







// sarting server
app.listen(PORT, ()=> {
    console.log(`server running on port ${PORT}`)
})