    const express = require('express');
    const path = require('path'); // Import the necessary modules
    const app = express();
    const port = 3000;

    // Serve static files from the 'public' directory
    app.use(express.static(path.join(__dirname, '../client')));

    // Serve the index.html file for the root route
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../client', 'index.html'));
    });

    // Start the server
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
