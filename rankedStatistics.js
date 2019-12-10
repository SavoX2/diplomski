const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

const getStats = (files) => {

    const mapping = {
        1: 'first',
        2: 'second',
        3: 'third',
        4: 'fourth'
    };
    let results = null;
    let imageNames = null;

    files.forEach(file => {
        const json = JSON.parse(fs.readFileSync(path.join(__dirname, 'public', 'ranked', file)));
        const keys = Object.keys(json);
        imageNames = keys.map(key => key.split('-')[0]);
        imageNames = imageNames.filter(val => val != 'username');
        imageNames = [...new Set(imageNames)];
        // make initial results object
        if (results == null) {
            results = {};
            imageNames.forEach(imageName => {
                results[imageName] = {
                    'HDR': {
                        'first': 0,
                        'second': 0,
                        'third': 0,
                        'fourth': 0,
                    },
                    'LDR': {
                        'first': 0,
                        'second': 0,
                        'third': 0,
                        'fourth': 0,
                    },
                    'ALG': {
                        'first': 0,
                        'second': 0,
                        'third': 0,
                        'fourth': 0,
                    },
                    'CNN': {
                        'first': 0,
                        'second': 0,
                        'third': 0,
                        'fourth': 0,
                    },
                };
            });
        }


        imageNames.forEach(imageName => {
            for (let i = 1; i <= 4; ++i) {
                let imageVote = results[imageName];
                let optionVote = json[`${imageName}-ranked-options-${i}`];
                imageVote[optionVote][mapping[i]];
                ++imageVote[optionVote][mapping[i]];
            }
        });

    });

    const options = ['HDR', 'LDR', 'ALG', 'CNN'];
    imageNames.forEach(imageName => {
        let image = results[imageName];
        options.forEach(option => {
            for (let i = 1; i <= 4; ++i) {
                image[option][mapping[i]] = image[option][mapping[i]] / files.length * 100;
            }
        });
    });

    return results;

}

const getStatsFromApi = (req, res, next) => {

    fs.readdir(path.join(__dirname, 'public', 'ranked'), (err, files) => {
        if (err) {
            console.log(chalk.red.inverse('Greska pri citanju direktorijuma sa rankiranjem.'));
            console.log(chalk.red(err));
            return res.json(err);
        }
        req.stats = getStats(files);
        next();
    });

};

module.exports = {
    getStatsFromApi: getStatsFromApi,
    getStats: getStats
};