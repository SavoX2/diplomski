const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const utilities = require('./public/js/custom/utilities');
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.sendFile('./index.html', { root: __dirname }));
app.get('/images', utilities.getImages, (req, res) => res.json(req.images));
app.post('/data', (request, response) => {
    console.log(request.params);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));