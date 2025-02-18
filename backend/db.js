const express = require('express');
const mysql = require('mysql2');
const bodyparser = require('body-parser');
const cors = require('cors');
const jwt = require("jsonwebtoken");
const secretKey = "yourSecretKey"

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


//old post method 

// app.post('/signup', (req, res) => {
//     const sql = "INSERT INTO login (name, email, password) VALUES (?, ?, ?)";
   
//     db.query(sql,  [
//         req.body.name,
//         req.body.email,
//         req.body.password
//     ], (err,data) => {
//         if (err) {
//             console.error("Database query error: ", err);
//             return res.status(500).json({ message: "ERROR", error: err.message });
//         }
//         return res.status(200).json({ message: "User registered successfully", data });
//     });
// });


const bcrypt = require("bcryptjs");

app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10); 
        const sql = "INSERT INTO login (name, email, password, role) VALUES (?, ?, ?, 'user')";

        db.query(sql, [name, email, hashedPassword], (err, data) => {
            if (err) {
                console.error("Database query error:", err);
                return res.status(500).json({ message: "Database error", error: err.message });
            }
            return res.status(200).json({ message: "User registered successfully" });
        });
    } catch (error) {
        return res.status(500).json({ message: "Error hashing password", error: error.message });
    }
});


// app.post('/login', (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ message: "All fields are required" });
//     }
//     const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
//     db.query(sql, [email, password], (err, result) => {
//         if (err) {
//             console.error("Database query error:", err);
//             return res.status(500).json({ message: "Database error", error: err.message });
//         }
//         if (result.length > 0) {
//             return res.status(200).json({ message: "Login successful", user: result[0] });
//         } else {
//             return res.status(401).json({ message: "Invalid email or password" });
//         }
//     });
// });

// Server listening
// app.listen(1234, () => {
//     console.log("Server is running on port 1234");
// });

//try


// app.post('/trylogin', (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ message: "All fields are required" });
//     }
//     const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
//     db.query(sql, [email, password], (err, result) => {
//         if (err) {
//             console.error("Database query error:", err);
//             return res.status(500).json({ message: "Database error", error: err.message });
//         }
//         if (result.length > 0) {
//             return res.status(200).json({ message: "Login successful", user: result[0] });
//         } else {
//             return res.status(401).json({ message: "Invalid email or password" });
//         }
//     });
// });

// ///Handle admin and user roles and Avoiding the SQl Injection 
// app.post('/login', (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ message: "All fields are required" });
//     }

//     const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
//     db.query(sql, [email, password], (err, result) => {
//         if (err) {
//             console.error("Database query error:", err);
//             return res.status(500).json({ message: "Database error", error: err.message });
//         }
//         if (result.length > 0) {
//             const user = result[0];

// //Check the User based on their Roles 
//             if (user.role === 'admin') {
//                 return res.status(200).json({ message: "Admin login successful", role: "admin", user });
//             } else {
//                 return res.status(200).json({ message: "User login successful", role: "user", user });
//             }
//         } else {
//             return res.status(401).json({ message: "Invalid email or password" });
//         }
//     });
// });




////bcrypt////



app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = "SELECT * FROM login WHERE email = ?";
    db.query(sql, [email], async (err, result) => {

        if (err)
             {
            console.error("Database query error:", err);
            return res.status(500).json({ message: "Database error", error: err.message });

        }

        if (result.length > 0) {
            const user = result[0];

          
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, secretKey, { expiresIn: "1h" });

            return res.status(200).json({ 

                message: "Login successful", 
                role: user.role, 
                token, 
                name: user.name

            });
        } else {

            return res.status(401).json({ message: "Invalid email or password" });

        }
    });
});
