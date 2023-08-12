const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const StudentModel = require('./models/student')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/student");

app.post('/login', (req, res)=>{
    const {email, password} = req.body;
    StudentModel.findOne({email:email})
    .then(user =>{
        if(user)
        {
            if(user.password === password)
            {
                res.json("Successfull")
            }else{
                res.json("Incorrect password")
            }
        }else{
            res.json("No record existed")
        }
    })
})

app.post('/register', (req,res)=>{
       StudentModel.create(req.body)
       .then(students => res.json(students))
       .catch(err => res.json(err))
    })

app.listen(4500, ()=>{
    console.log("server is running at port 4500")
})