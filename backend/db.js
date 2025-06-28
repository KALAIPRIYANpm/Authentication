const express = require('express');
const mysql = require('mysql2');
const bodyparser = require('body-parser');
const cors = require('cors');
const jwt = require("jsonwebtoken");
const secretKey = "yourSecretKey"
const app = express();
app.use(express.json());


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

  console.log("Received signup request with data:", req.body);

  // Input validation
  if (!name || !email || !password) {
    console.log("Signup failed: Missing fields");
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Ensure password is a string
    if (typeof password !== "string") {
      console.error("Password is not a valid string:", password);
      return res.status(400).json({ message: "Password must be a string" });
    }

    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed successfully.");

    const sql = "INSERT INTO login (name, email, password, role) VALUES (?, ?, ?, 'user')";

    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        console.error("Database insert error:", err.message);
        return res.status(500).json({ message: "Database error", error: err.message });
      }
      console.log("User inserted successfully:", result.insertId);
      return res.status(200).json({ message: "User registered successfully", userId: result.insertId });
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ message: "Hashing error", error: error.message });
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

app.post("/login", (req,res) => {
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
                name :  user.name,
                adminId : user.id,
                userId:user.id

            });
        } else {

            return res.status(401).json({ message: "Invalid email or password" });

        }
    });
});


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


app.post("/events",async (req,res)=>{
    const {title,date,description,venue,total_tickets,available_tickets,price} = req.body;

    if(!title || !date || !description || !venue || !total_tickets || !available_tickets ||!price){
        return res.status(400).json({message:"All fields are Required"})
    }

    try{

        const sql = "INSERT INTO events (title,date,description,venue,total_tickets,available_tickets,price) VALUES (?,?,?,?,?,?,?)"

        db.query(sql,[title,date,description,venue,total_tickets,available_tickets,price],(err,result)=>{

            if(err){
                console.error("Database Query Error",err)
                return res.status(500).json({message:"Database Error",error:err.message})
            }
            return res.status(200).json({message:"Event Created Successfully"});
        });
    } catch(error){
        return res.status(500).json({message:"error"})
    }
})


///get method for user event details view 

app.get("/regList",async (req,res)=>{
    
    const sql = "SELECT * FROM events";
    db.query(sql,(err,result)=>{
        if (err) 
            {
            return res.status(500).json(err);
        }
        else{
            res.json(result);
        }
       
    });
});

app.get("/adminDetails", (req, res) => {
    const adminId = req.query.id; 
    const sql = "SELECT name, role FROM login WHERE id = ?";

    db.query(sql, [adminId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database error", details: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.json(result[0]); 
    });
});

//booking backend

app.post("/booking",(req,res)=>{
    const{number,name,email,mobile} = req.body;
    if(!number || !name || !email || !mobile){
        return res.status(400).json({message:"All fields are Required"})
    }
    try{
        const sql = "INSERT INTO booking (number,name,email,mobile) VALUES (?,?,?,?)"

        db.query(sql,[number,name,email,mobile],(err,result)=>{

            if(err){
                return res.status(500).json({message:"Database Error",error:err.message})
            }
            else{
                return res.status(200).json({message:"Posted Successfully"});
            }
        });
    }

    catch(error){
        return res.status(500).json({message:"error",error:err.message})
    }

});


//fetching the user details

app.get("/userDetails", (req, res) => {
  const userId = req.query.id;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const sql = "SELECT name, role FROM login WHERE id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err.message });
    if (result.length === 0) return res.status(404).json({ message: "User not found" });
    res.json(result[0]);
  });
});


//Booking table 

app.post("/book", (req, res) => {
  const { userId, eventId, email, ticketCount } = req.body;

  if (!userId || !eventId || !email || !ticketCount) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = `INSERT INTO bookings (user_id, event_id, email, ticket_count)
               VALUES (?, ?, ?, ?)`;

  db.query(sql, [userId, eventId, email, ticketCount], (err, result) => {
    if (err) {
      console.error("Booking error:", err);
      return res.status(500).json({ message: "Database error", error: err.message });
    }

    return res.status(200).json({ message: "Booking successful!" });
  });
});

// Get registrations for a specific event
app.get("/registrations/:eventId", (req, res) => {
  const eventId = req.params.eventId;

  const sql = `
    SELECT 
      b.id,
      u.name AS userName,
      u.email,
      b.ticket_count,
      b.booking_time
    FROM bookings b
    JOIN login u ON b.user_id = u.id
    WHERE b.event_id = ?
    ORDER BY b.booking_time DESC
  `;

  db.query(sql, [eventId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err.message });
    }
    res.json(results);
  });
});



// GET ongoing events with booking count
app.get("/admin/ongoing-events", (req, res) => {
  const sql = `
    SELECT 
      e.id, e.title, e.venue, e.date, e.total_tickets,
      COALESCE(SUM(b.ticket_count), 0) AS tickets_filled
    FROM events e
    LEFT JOIN bookings b ON e.id = b.event_id
    GROUP BY e.id
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: "Error fetching events", error: err.message });
    res.json(result);
  });
});

// DELETE an event
app.delete("/admin/delete-event/:id", (req, res) => {
  const eventId = req.params.id;

  const deleteBookings = `DELETE FROM bookings WHERE event_id = ?`;
  const deleteEvent = `DELETE FROM events WHERE id = ?`;

  db.query(deleteBookings, [eventId], (err) => {
    if (err) return res.status(500).json({ message: "Error deleting bookings", error: err.message });

    db.query(deleteEvent, [eventId], (err2) => {
      if (err2) return res.status(500).json({ message: "Error deleting event", error: err2.message });

      res.json({ message: "Event and related bookings deleted successfully" });
    });
  });
});


app.get("/event/:id", (req, res) => {
  const eventId = req.params.id;
  const sql = `
    SELECT e.*, COALESCE(SUM(b.ticket_count), 0) AS tickets_booked
    FROM events e
    LEFT JOIN bookings b ON e.id = b.event_id
    WHERE e.id = ?
    GROUP BY e.id
  `;
  db.query(sql, [eventId], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err.message });
    if (result.length === 0) return res.status(404).json({ message: "Event not found" });
    res.json(result[0]);
  });
});


// server.js or your Express app file
app.get("/userBookings", (req, res) => {
  const userId = req.query.userId;
  const sql = `
    SELECT e.title, e.date, e.venue, e.price, b.ticket_count 
    FROM bookings b 
    JOIN events e ON b.event_id = e.id 
    WHERE b.user_id = ?
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err.message });
    }
    res.json(results);
  });
});

