const express=require("express");
const bodyParser=require("body-parser")
const db=require("./firebase.js")
const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({type:"application/vnd.api+json"}))

const port=process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`SERVER RUNNING AT ${port}`)
})

//Now To get all data from firebase database
app.get("/data",(req,res)=>{

    db.database().ref("MyAppData").on('value',(snapshots)=>{
        let data=snapshots.val();
        res.json({
            message:"Successfully Got Data",
            results:data
        })
    })
    
})

// Now add some data to firebase DB
app.post("/data",(req,res)=>{

    console.log(req.body)
    db.database().ref("MyAppData").push().set(req.body,(result)=>{
        res.json({
            message:"POST DATA",
            results:result
        })
    })
   
})