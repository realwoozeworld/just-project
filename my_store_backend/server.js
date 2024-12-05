const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: '3306', // Replace with your MySQL host
    user: 'nodari.khutsishvili3@gmail.com', // Replace with your MySQL username
    password: 'yourpassword', // Replace with your MySQL password
    database: 'my_store', // Replace with your database name
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// API Route: Fetch Order Details
app.get('/api/orders/:id', (req, res) => {
    const orderId = req.params.id;
    const query = 'SELECT * FROM orders WHERE id = ?';
    db.query(query, [orderId], (err, results) => {
        if (err) {
            console.error('Error fetching order:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json(results[0]);
        }
    });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
