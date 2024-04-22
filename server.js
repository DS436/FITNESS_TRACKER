const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // for HTTP; set to true if using HTTPS
}));

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
    // Authentication logic
    if (req.body.username === "admin" && req.body.password === "admin") {
        req.session.loggedIn = true;
        req.session.username = req.body.username;
        res.redirect('/');
    } else {
        res.send('Invalid username or password');
    }
});

app.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    } else {
        res.redirect('/login');
    }
});

app.post('/submit-exercise', (req, res) => {
    if (req.session.loggedIn) {
        const data = { date: req.body.date, duration: parseInt(req.body.duration) };
        // Append data to a file
        fs.appendFileSync('data.json', JSON.stringify(data) + '\n', 'utf8');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return console.log(err);
        }
        res.redirect('/login');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
