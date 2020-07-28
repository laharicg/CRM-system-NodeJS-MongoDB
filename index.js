const express = require("express");
const mongodb = require("mongodb");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const dotenv =require("dotenv").config();
const url ="mongodb://localhost:27017"
//const url = "mongodb+srv:laharic:Love2joker@cluster0.s9rbw.mongodb.net/CRM1?retryWrites=true&w=majority"
const app = express();
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());



app.post("/register",async(req,res) => {
   // console.log(req.body)
    try {
        let salt = await bcrypt.genSalt(7);
        let hash = await bcrypt.hash(req.body.Password,salt);
        console.log(hash)
        console.log("above is hash"); 
        req.body.Password = hash
        let client = await mongodb.connect(url)
        let db = client.db("CRM1");
        let data = await db.collection("data").insertOne(req.body)
       // console.log(req.body)
             
        
        await client.close()
    }catch (error) {
        console.log(error)
        
    }
    res.json({
        message:"loading"
    })
})
/*
app.post("/login", async (req,res) => {
try{
    //console.log(req.body);
    let client = await mongodb.connect(url);
    let db = client.db("CRM1")
    let user = await db.collection("data").findOne({Email: req.body.Email});
    //console.log(user);
    console.log(req.body.Email);
    console.log(user.Email);
    let result = await bcrypt.compare(req.body.Password,user.Password);
    console.log(req.body.Password);
    console.log(user.Password);

    if(result == true){
        let jwtToken = await jwt.sign({id:1, name:"Chandana",role:"ADMIN"},process.env.JWT)
        console.log(jwtToken);
        console.log("logged in");
        res.send({"Success":"Success!"});
        return  // comment this return when checking with postman
        
    } else{ console.log("False");
    
        res.json({
            message:"Password doesn't match!"
        }) 
    } 

    await client.close();
}catch (error) {console.log(error)}
res.json({
    message:"Log-info"
})

})
*/ 

app.get("/login",async function(req,res){
    
    try {
        let client = await mongodb.connect(url)
        console.log(url)
       let db = client.db("CRM1")
        let data = await db.collection("data").find().toArray();
        await client.close(data);
        res.json(data)
       
    } catch (error) {
        console.log("server catch")
    console.log(error)
    }
})

/*
async function authenticate(req, res, next) {
    try{
        if(req.headers.authorization !== undefined) {
            let verifyToken = await jwt.verify(
                req.headers.authorization,
                process.env.JWT
            );
            req.id = verifyToken.id;
            req.role = verifyToken.role;
            next();
            return
        } else {
            res.status(401).json({
                message: "Not Authorized"
            })
        }
    }catch (error) {console.log(error)}
    res.json({
        message:"Authenticated"
    })
    
} */

//app.get("/chat-history", [authenticate], async (req,res) =>{

/*
app.get("/chat-history", async (req,res) =>{
    let client = await mongodb.connect(url);
    let db = client.db("CRM1");
    let user = await db
    .collection("data")
    .find({_id: mongodb.ObjectId(req.id)})
    .toArray();
    res.json({
        message:"Very Secret data has been returned",
        user:user[0],
    });
});
*/
app.listen(3010, function(){
    console.log("listening")
})