const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { connectToDatabase, getClient } = require('./db');

app.use(express.static('public'));

// Connect to MongoDB
connectToDatabase();

// Your routes and middleware for dynamic content go here

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
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
