const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const { connectToDatabase, getClient } = require('./db');

app.use(express.static('public'));

// Connect to MongoDB
connectToDatabase();

// Your routes and middleware for dynamic content go here
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    // Send the HTML file when accessing the root URL
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/products', async (req, res) => {
    const db = getClient().db('Black_lion_store');
    const collection = db.collection('products');

    try {
        const products = await collection.find().toArray();
        res.json(products); // Return JSON data to be consumed by your front end
    } catch (error) {
        console.error('Error fetching products from MongoDB:', error);
        res.status(500).send('Internal Server Error');
    }
});
