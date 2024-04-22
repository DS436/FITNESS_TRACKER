const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'fitness tracker secret', resave: false, saveUninitialized: true }));

app.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.sendFile(__dirname + '/public/index.html');
    } else {
        res.redirect('/login');
    }
});

app.get('/get-user-info', (req, res) => {
    if (req.session.loggedIn) {
        res.json({ username: req.session.username }); // Assuming username is stored in session
    } else {
        res.status(401).send('Unauthorized');
    }
});

app.get('/get-exercise-data', (req, res) => {
    if (req.session.loggedIn) {
        // Read the exercise data from file and send it
        const rawData = fs.readFileSync('data.json', 'utf8');
        const dataPoints = rawData.trim().split('\n').map(line => JSON.parse(line));
        const formattedData = dataPoints.map(item => ({ label: item.date, y: parseInt(item.duration) }));
        res.json(formattedData);
    } else {
        res.status(401).send('Unauthorized');
    }
});

// Remaining routes and middleware...

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
