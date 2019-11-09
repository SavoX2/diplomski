const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const statisticUtils = require('./statisticsUtils');

fs.readdir(path.join(__dirname, 'public', 'users'), (err, files) => {

    let dict = statisticUtils.getDict(files);

    const keys = Object.keys(dict).sort();
    let statsDict = statisticUtils.getStatsDict(keys, dict);

    const statsKeys = Object.keys(statsDict).sort();

    statsKeys.forEach((key, index) => {
        switch (index % 4) {
            case 0:
                console.log(chalk.red.inverse(`${key}:`), chalk.red(starLength(statsDict[key].number)), chalk.red.inverse(`${statsDict[key].percentage.toFixed(2)}%`));
                break;
            case 1:
                console.log(chalk.yellow.inverse(`${key}:`), chalk.yellow(starLength(statsDict[key].number)), chalk.yellow.inverse(`${statsDict[key].percentage.toFixed(2)}%`));
                break;
            case 2:
                console.log(chalk.green.inverse(`${key}:`), chalk.green(starLength(statsDict[key].number)), chalk.green.inverse(`${statsDict[key].percentage.toFixed(2)}%`));
                break;
            case 3:
                console.log(chalk.magenta.inverse(`${key}:`), chalk.magenta(starLength(statsDict[key].number)), chalk.magenta.inverse(`${statsDict[key].percentage.toFixed(2)}%`), '\n');
                break;
        }
    });

});

const starLength = (number) => {
    let str = '';
    for (var i = 0; i < number; ++i) {
        str += '*';
    }
    return str;
}