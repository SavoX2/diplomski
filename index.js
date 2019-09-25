const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const utilities = require('./public/js/custom/utilities');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.sendFile('./index.html', { root: __dirname }));
app.get('/images', utilities.getImages, (req, res) => res.json(req.images));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));