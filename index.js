const express = require('express');
const path = require('path');
const utilities = require('./public/js/custom/utilities');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => res.sendFile('/index.html'));

app.get('/images', utilities.getImages, (req, res) => res.json(req.images));

app.post('/data', (req, res) => {
    fs.writeFileSync(path.join(__dirname, 'public', 'users', `${req.body.username}.json`), JSON.stringify(req.body));
    res.sendFile('/thankyou.html', {
        root: path.join(__dirname, 'public')
    });
});

app.get('/temp', (req, res) => res.sendFile('/temp.html', { root: path.join(__dirname, 'public') }));

app.get('/demo', (req, res) => res.sendFile('/demo.html', { root: path.join(__dirname, 'public') }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));