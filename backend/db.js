const express = require('express');
const mysql = require('mysql');
const bodyparser=require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

const db = mysql.createConnection({
    database:"project",
    user:"root",
    password:"kalaipriyan0007",
    port:"3306"
})

// db.connect((err)=>{
//     if(err){
//         console.log("database was failed to connect ",err.message)
//     }
//     console.log("Database was connectd successfully");

// })

app.listen(1234, ()=>{
    console.log("Database is connected");
});

app.post('/signup',(req,res)=>{
    const sql = "INSERT INTO login (`name`,`email`,`password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql,[values],(err,data)=>{
        if(err){
            return res.json("ERROR");

        }
        return res.json(data);
    })
})