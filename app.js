    const express = require('express');
    const path = require('path'); // Node.js built-in module for path manipulation
    const app = express();
    const port = 3000;

    // Serve static files from the 'public' directory
    app.use(express.static(path.join(__dirname)));

    // Serve the index.html file for the root route
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });

    // Start the server
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
