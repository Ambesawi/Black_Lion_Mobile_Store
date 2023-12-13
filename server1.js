const express = require('express');
const app = express();
const path = require('path');
const { connectToDatabase, getClient } = require('./db');
const ejs = require('ejs');

app.set('view engine', 'ejs');

// Connect to MongoDB
connectToDatabase();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    const db = getClient().db('Black_lion_store');
    const collection = db.collection('products');

    try {
        const products = await collection.find().toArray();
        // Render the 'index' view and pass the products as a variable
        res.render('index', { products });
    } catch (error) {
        console.error('Error fetching products from MongoDB:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
