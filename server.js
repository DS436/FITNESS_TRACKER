const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public')); // Serve static files from 'public' directory

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
