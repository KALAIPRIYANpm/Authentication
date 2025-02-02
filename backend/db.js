const express = require('express');
const mysql = require('mysql2');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

const db = mysql.createConnection({
    host: "localhost", 
    database: "project",
    user: "root",
    password: "kalaipriyan0007",
    port: 3306 
});

db.connect((err) => {
    if (err) {
        console.log("Database failed to connect:", err.message);
    } else {
        console.log("Database connected successfully");
    }
});

app.listen(1234, () => {
    console.log("Server is running on port 1234");
});

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (name, email, password) VALUES (?, ?, ?)";
    // const values = [
    //     req.body.name,
    //     req.body.email,
    //     req.body.password
    // ];

    db.query(sql,  [
        req.body.name,
        req.body.email,
        req.body.password
    ], (err,data) => {
        if (err) {
            console.error("Database query error: ", err);
            return res.status(500).json({ message: "ERROR", error: err.message });
        }
        return res.status(200).json({ message: "User registered successfully", data });
    });
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ message: "Database error", error: err.message });
        }
        if (result.length > 0) {
            return res.status(200).json({ message: "Login successful", user: result[0] });
        } else {
            return res.status(401).json({ message: "Invalid email or password" });
        }
    });
});

// Server listening
// app.listen(1234, () => {
//     console.log("Server is running on port 1234");
// });

//try


app.post('/trylogin', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ message: "Database error", error: err.message });
        }
        if (result.length > 0) {
            return res.status(200).json({ message: "Login successful", user: result[0] });
        } else {
            return res.status(401).json({ message: "Invalid email or password" });
        }
    });
});


