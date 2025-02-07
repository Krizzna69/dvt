const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Change this if necessary
    password: "Jaswanth@123", // Set your MySQL password
    database: "star_db"
});

db.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:", err);
    } else {
        console.log("✅ Connected to MySQL Database!");
    }
});

// Add Star API Endpoint
app.post("/add-star", (req, res) => {
    const { name, magnitude, constellation, spectralType, ra, de } = req.body;

    const query = "INSERT INTO stars (name, magnitude, constellation, spectral_type, ra, `de`) VALUES (?, ?, ?, ?, ?, ?)";
    
    db.query(query, [name, magnitude, constellation, spectralType, ra, de], (err, result) => {
        if (err) {
            console.error("❌ Error inserting data:", err);
            return res.json({ success: false, error: err.sqlMessage });
        }
        res.json({ success: true });
    });
});

// Start the Server
app.listen(5000, () => {
    console.log("🚀 Server running on http://localhost:5000");
});
