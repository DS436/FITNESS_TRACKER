const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'fitness tracker secret', resave: false, saveUninitialized: true }));

// Routes
app.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.sendFile(__dirname + '/public/index.html');
    } else {
        res.redirect('/login');
    }
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Simple authentication logic (replace with database lookup in production)
    if (username === "user" && password === "pass") {
        req.session.loggedIn = true;
        res.redirect('/');
    } else {
        res.send('Invalid username or password');
    }
});

app.post('/submit-exercise', (req, res) => {
    if (req.session.loggedIn) {
        const { date, duration } = req.body;
        const data = { date, duration };
        // Append data to a json file (simulate a database)
        fs.appendFileSync('data.json', JSON.stringify(data) + '\n');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
