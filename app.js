const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '')));

// Serve static files from the 'css' directory
app.use('/css', express.static(path.join(__dirname, 'css')));

app.get('/', (req, res) => {
    // Send the HTML file when accessing the root URL
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
