const express =require("express")
const app=express()
const cors=require("cors")
const userRoutes=require("./routes/user")
// const adminRoutes=require("./routes/admin")
const dbconnect=require("./config/config")
const morgan=require("morgan")
// const multer=require("multer")

dbconnect.dbconnect()
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use((req, res, next) => {
    res.header("Cache-Control", "no-cache,  no-store, must-revalidate");
    next();
  });
app.use("/public/images",express.static(__dirname+"public/images"))  

app.use(morgan("dev"))
app.use("/",userRoutes)
// app.use("/admin",adminRoutes)

app.listen(4000,()=>{
    console.log("server started to listing port 4000 ")
})