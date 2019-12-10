const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const utilities = require('./public/js/custom/utilities');
const statisticsUtils = require('./statisticsUtils');
const rankedStatistics = require('./rankedStatistics');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => res.sendFile('/index.html'));

app.get('/images', utilities.getImages, (req, res) => res.json(req.images));

app.get('/users', statisticsUtils.getStatsDictFromApi, (req, res) => res.json(req.statsDict));

app.get('/ranked_stats', rankedStatistics.getStatsFromApi, (req, res) => res.json(req.stats));

app.post('/data', (req, res) => {
    fs.writeFileSync(path.join(__dirname, 'public', 'users', `${req.body.username}${Date.now()}.json`), JSON.stringify(req.body));
    res.sendFile('/thankyou.html', {
        root: path.join(__dirname, 'public')
    });
});

app.post('/ranked_data', (req, res) => {
    fs.writeFileSync(path.join(__dirname, 'public', 'ranked', `${req.body.username}${Date.now()}.json`), JSON.stringify(req.body));
    res.sendFile('/thankyou_ranked.html', {
        root: path.join(__dirname, 'public')
    });
});

app.get('/charts_ranked', (req, res) => res.sendFile('/charts_ranked.html', { root: path.join(__dirname, 'public') }));

app.get('/ranked', (req, res) => res.sendFile('/ranked.html', { root: path.join(__dirname, 'public') }));

app.get('/demo', (req, res) => res.sendFile('/demo.html', { root: path.join(__dirname, 'public') }));

app.get('/charts', (req, res) => res.sendFile('/charts.html', { root: path.join(__dirname, 'public') }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));