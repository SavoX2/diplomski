const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

const getStats = () => {

    const mapping = {
        1: 'first',
        2: 'second',
        3: 'third',
        4: 'fourth'
    };

    fs.readdir(path.join(__dirname, 'public', 'ranked'), (err, files) => {
        if (err) {
            console.log(chalk.red.inverse('Greska pri citanju direktorijuma sa korisnicima.'));
            console.log(chalk.red(err));
            return res.json(err);
        }

        results = null;

        let j = 0;
        files.forEach(file => {
            const json = JSON.parse(fs.readFileSync(path.join(__dirname, 'public', 'ranked', file)));
            const keys = Object.keys(json);
            let imageNames = keys.map(key => key.split('-')[0]);
            imageNames = imageNames.filter(val => val != 'username');
            imageNames = [...new Set(imageNames)];
            // make initial results object
            if (results == null) {
                results = [];
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
                    ++j;
                    let imageVote = results[imageName];
                    let optionVote = json[`${imageName}-ranked-options-${i}`];
                    imageVote[optionVote][mapping[i]];
                    ++imageVote[optionVote][mapping[i]];
                }
            });

        });

    });
}

getStats();