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
 // Query PostgreSQL to fetch all users
     const result = await pool.query('SELECT * FROM users');
     res.json(result.rows);  // Return the result as JSON
 } catch (err) {
     console.error(err);
     res.status(500).json({ error: 'Internal server error' });
 }
});

// Route to create a new user in the 'users' table
app.post('/api/users', async (req, res) => {
    console.log("Received Data:", req.body);

 const { username, phone, email, password } = req.body;

 if (!username || !phone || !email || !password) {
     return res.status(400).json({ error: 'All fields are required' });
 }

 try {
 // Hash the password before storing it
     const hashedPassword = await bcrypt.hash(password, 10);

 // Insert new user into the 'users' table
     const result = await pool.query(
     'INSERT INTO users (username, phone, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
     [username, phone, email, hashedPassword]
     );

 res.status(201).json(result.rows[0]);  // Return the created user as JSON
 } catch (err) {
     console.error(err);
     res.status(500).json({ error: 'Error creating user' });
 }
});

app.post('/api/contact', async(req, res) => {
    console.log("Received data", req.body);
    const {name, email, message} = req.body;

    if (!name || !email || !message){
        res.status(400).json({error: 'All fields are required!'});
    }

    try{
        const  result = await pool.query(
            'INSERT INTO contact (name, email, message) VALUES ($1, $2,$3) RETURNING *',
            [name, email, message]
        );
        res.status(201).json(result.rows[0]);
    }catch(error){
        console.log(error);
        res.status(500).json({error: 'Error inserting info!'})
    }
});

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

        res.json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Route to update a user by ID
app.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const { username, phone, email, password } = req.body;

    try {
        let updatedFields = [];
        let values = [id];

        if (username) {
            updatedFields.push(`username = $${values.length + 1}`);
            values.push(username);
        }
        if (phone) {
            updatedFields.push(`phone = $${values.length + 1}`);
            values.push(phone);
        }
        if (email) {
            updatedFields.push(`email = $${values.length + 1}`);
            values.push(email);
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedFields.push(`password = $${values.length + 1}`);
            values.push(hashedPassword);
        }

        if (updatedFields.length === 0) {
            return res.status(400).json({ error: 'No fields to update' });
        }

        const query = `UPDATE users SET ${updatedFields.join(', ')} WHERE id = $1 RETURNING *`;
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(result.rows[0]);  // Return the updated user as JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating user' });
    }
});


// Route to delete a user by ID
app.delete('/api/users/:id', async (req, res) => {
 const { id } = req.params;

 try {
 // Delete user from the 'users' table
const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);

 if (result.rows.length === 0) {
 return res.status(404).json({ error: 'User not found' });
 }

 res.json({ message: 'User deleted successfully' });  // Return success message
 } catch (err) {
 console.error(err);
 res.status(500).json({ error: 'Error deleting user' });
 }
});

// Route to place an order
app.post('/api/orders', async (req, res) => {
    const { truck_name, purpose, duration, size, sizeUnit } = req.body;

    if (!truck_name || !purpose || !duration || !size || !sizeUnit ){
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO orders (truck_name, purpose, duration, size, sizeUnit) VALUES ($1, $2, $3, $4) RETURNING *',
            [truck_name, purpose, duration, size, sizeUnit]
        );

        res.status(201).json({ message: 'Order placed successfully', order: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error placing order' });
    }
});

// Test route
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
