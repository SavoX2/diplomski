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
    let results = null;
    let imageNames = null;

    fs.readdir(path.join(__dirname, 'public', 'ranked'), (err, files) => {
        if (err) {
            console.log(chalk.red.inverse('Greska pri citanju direktorijuma sa korisnicima.'));
            console.log(chalk.red(err));
            return res.json(err);
        }

        files.forEach(file => {
            const json = JSON.parse(fs.readFileSync(path.join(__dirname, 'public', 'ranked', file)));
            const keys = Object.keys(json);
            imageNames = keys.map(key => key.split('-')[0]);
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
                    let imageVote = results[imageName];
                    let optionVote = json[`${imageName}-ranked-options-${i}`];
                    imageVote[optionVote][mapping[i]];
                    ++imageVote[optionVote][mapping[i]];
                }
            });

        });

        // ne zeli direkt results.forEach, ne udje nikad iako results nije prazan?
        console.log('Legend: ');
        console.log(`\t${chalk.red(starLength(1))} - HDR`)
        console.log(`\t${chalk.blue(starLength(1))} - LDR`)
        console.log(`\t${chalk.yellow(starLength(1))} - CNN`)
        console.log(`\t${chalk.green(starLength(1))} - ALG`)
        // statistics by order of votes per place
        imageNames.forEach(imageName => {
            console.log(chalk.cyan(`First place votes for: ${imageName}`));
            console.log(chalk.red(starLength(results[imageName]['HDR'].first)) + chalk.blue(starLength(results[imageName]['LDR'].first)) +
                chalk.yellow(starLength(results[imageName]['CNN'].first)) + chalk.green(starLength(results[imageName]['ALG'].first)));
            console.log(chalk.cyan(`Second place votes for: ${imageName}`));
            console.log(chalk.red(starLength(results[imageName]['HDR'].second)) + chalk.blue(starLength(results[imageName]['LDR'].second)) +
                chalk.yellow(starLength(results[imageName]['CNN'].second)) + chalk.green(starLength(results[imageName]['ALG'].second)));
            console.log(chalk.cyan(`Third place votes for: ${imageName}`));
            console.log(chalk.red(starLength(results[imageName]['HDR'].third)) + chalk.blue(starLength(results[imageName]['LDR'].third)) +
                chalk.yellow(starLength(results[imageName]['CNN'].third)) + chalk.green(starLength(results[imageName]['ALG'].third)));
            console.log(chalk.cyan(`Fourth place votes for: ${imageName}`));
            console.log(chalk.red(starLength(results[imageName]['HDR'].fourth)) + chalk.blue(starLength(results[imageName]['LDR'].fourth)) +
                chalk.yellow(starLength(results[imageName]['CNN'].fourth)) + chalk.green(starLength(results[imageName]['ALG'].fourth)));
        });

    });

}

const starLength = (number) => {
    let str = '';
    for (var i = 0; i < number; ++i) {
        str += '*';
    }
    return str;
}

const displayStatsToConsole = (stats) => {
   
};

getStats();