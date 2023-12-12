// server.js
const express = require('express');
const path = require('path');
const { connectToDatabase, getClient } = require('./db');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '')));
app.use('/css', express.static(path.join(__dirname, 'css')));

// Connect to MongoDB
connectToDatabase();

app.get('/', async (req, res) => {
    const db = getClient().db('Black_lion_store');
    const collection = db.collection('products');

    try {
        const products = await collection.find().toArray();
        res.render('index', { products });
    } catch (error) {
        console.error('Error fetching products from MongoDB:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
