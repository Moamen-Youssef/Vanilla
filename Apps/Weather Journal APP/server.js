const express = require("express") ;
const cors = require("cors") ;
const app = express() ;
const bodyParser = require('body-parser') ;
app.use(express.json());
app.use(express.static("frontend")) ;

app.listen(8000, ()=>{
    console.log("server is ready") ;
})
let projectData = {} ;


app.post("/addWeatherData" , (req,res)=>{
     projectData = req.body ;
})

app.get("/allData" , (req,res)=>{
    res.send(projectData) ;

})






