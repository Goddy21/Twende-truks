require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection setup using connection pooling
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test the database connection
pool.connect()
 .then(() => console.log('Connected to PostgreSQL'))
 .catch(err => console.error('Connection error', err.stack));

// Routes
// Route to get all users from the 'users' table
app.get('/api/users', async (req, res) => {
 try {
     const result = await pool.query('SELECT * FROM users');
     res.json(result.rows);
 } catch (err) {
     console.error(err);
     res.status(500).json({ error: 'Internal server error' });
 }
});

// Route to create a new user
app.post('/api/users', async (req, res) => {
    console.log("Received Data:", req.body);
    const { username, phone, email, password } = req.body;

    if (!username || !phone || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0){
            return res.status(400).json({error: 'Email already exists!'})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (username, phone, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, phone, email, hashedPassword]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating user' });
    }
});

//Route to login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        // Find user by email
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = result.rows[0];

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        res.json({ message: 'Login successful', user: { id: user.id, name: user.username, email: user.email } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to get all contacts
app.get('/api/contacts', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM contact');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching contacts' });
    }
});

// Route to add a new contact
app.post('/api/contact', async(req, res) => {
    console.log("Received data", req.body);
    const { name, email, message } = req.body;

    if (!name || !email || !message){
        return res.status(400).json({error: 'All fields are required!'});
    }

    try {
        const result = await pool.query(
            'INSERT INTO contact (name, email, message) VALUES ($1, $2, $3) RETURNING *',
            [name, email, message]
        );
        res.status(201).json(result.rows[0]);
    } catch(error){
        console.error(error);
        res.status(500).json({error: 'Error inserting contact info!'});
    }
});

// Route to get all orders
app.get('/api/orders', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM orders');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching orders' });
    }
});


// Route to place an order
app.post('/api/orders', async (req, res) => {
    console.log("Received order request:", req.body); 
    const { truck_name, purpose, duration, size, sizeUnit } = req.body;

    if (!truck_name || !purpose || !duration || !size || !sizeUnit ){
        console.log("Missing Fields:", { truck_name, purpose, duration, size, sizeUnit });
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO orders (truck_name, purpose, duration, size, sizeUnit) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [truck_name, purpose, duration, size, sizeUnit]
        );

        res.status(201).json({ message: 'Order placed successfully', order: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error placing order' });
    }
});

// Route to update a user by ID
app.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const { username, phone, email, password } = req.body;

    try {
        const hashedPassword = password ? await bcrypt.hash(password, 10) : null; // If password is not updated, use old one
        const result = await pool.query(
            'UPDATE users SET username=$1, phone=$2, email=$3, password=$4 WHERE id=$5 RETURNING *',
            [username, phone, email, hashedPassword || req.body.password, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating user' });
    }
});

// Route to delete a user by ID
app.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(204).send(); // No Content
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting user' });
    }
});

// Route to update an order by ID
app.put('/api/orders/:id', async (req, res) => {
    const { id } = req.params;
    const { truck_name, purpose, duration, size, sizeunit, status, payment_status } = req.body;

    try {
        const result = await pool.query(
            'UPDATE orders SET truck_name=$1, purpose=$2, duration=$3, size=$4, sizeUnit=$5, status=$6, payment_status=$7 WHERE id=$8 RETURNING *',
            [truck_name, purpose, duration, size, sizeunit, status, payment_status, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating order' });
    }
});


// Route to delete an order by ID
app.delete('/api/orders/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM orders WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(204).send(); // No Content
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting order' });
    }
});

// Route to update a contact by ID
app.put('/api/contact/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, message } = req.body;

    try {
        const result = await pool.query(
            'UPDATE contact SET name=$1, email=$2, message=$3 WHERE id=$4 RETURNING *',
            [name, email, message, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating contact' });
    }
});

// Route to delete a contact by ID
app.delete('/api/contact/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM contact WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        res.status(204).send(); // No Content
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting contact' });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
