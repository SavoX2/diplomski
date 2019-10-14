const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

let dict = {};

fs.readdir(path.join(__dirname, 'public', 'users'), (err, files) => {

    files.forEach(file => {

        const json = JSON.parse(fs.readFileSync(path.join(__dirname, 'public', 'users', file)));
        const keys = Object.keys(json);

        keys.forEach(key => {
            if (key !== 'username') {
                if (json[key].endsWith('_CC')) {
                    if (!dict[`${key}_CC`]) {
                        dict[`${key}_CC`] = 1;
                    } else {
                        dict[`${key}_CC`] += 1;
                    }
                } else if (json[key].endsWith('_TT')) {
                    if (!dict[`${key}_TT`]) {
                        dict[`${key}_TT`] = 1;
                    } else {
                        dict[`${key}_TT`] += 1;
                    }
                } else if (json[key].endsWith('_LDR')) {
                    if (!dict[`${key}_LDR`]) {
                        dict[`${key}_LDR`] = 1;
                    } else {
                        dict[`${key}_LDR`] += 1;
                    }
                } else {
                    if (!dict[key]) {
                        dict[key] = 1;
                    } else {
                        dict[key] += 1;
                    }
                }
            }
        });
    });

    const keys = Object.keys(dict).sort();
    let statsDict = {};

    keys.forEach(key => {
        if (key.endsWith('_CC')) {
            if (!dict[key.replace('_CC', '')]) {
                dict[key.replace('_CC', '')] = 0;
                statsDict[key.replace('radio-name-', '').replace('_CC', '')] = {
                    number: 0,
                    percentage: 0,
                };
            }
            if (!dict[key.replace('_CC', '_TT')]) {
                dict[key.replace('_CC', '_TT')] = 0;
                statsDict[key.replace('radio-name-', '').replace('_CC', '_TT')] = {
                    number: 0,
                    percentage: 0,
                };
            }
            if (!dict[key.replace('_CC', '_LDR')]) {
                dict[key.replace('_CC', '_LDR')] = 0;
                statsDict[key.replace('radio-name-', '').replace('_CC', '_LDR')] = {
                    number: 0,
                    percentage: 0,
                };
            }
            const percentage = (dict[key] / (dict[key] + dict[key.replace('_CC', '')] + dict[key.replace('_CC', '_TT')] + dict[key.replace('_CC', '_LDR')])) * 100;
            statsDict[key.replace('radio-name-', '')] = {
                number: dict[key],
                percentage
            };
        } else if (key.endsWith('_TT')) {
            if (!dict[key.replace('_TT', '')]) {
                dict[key.replace('_TT', '')] = 0;
                statsDict[key.replace('radio-name-', '').replace('_TT', '')] = {
                    number: 0,
                    percentage: 0,
                };
            }
            if (!dict[key.replace('_TT', '_CC')]) {
                dict[key.replace('_TT', '_CC')] = 0;
                statsDict[key.replace('radio-name-', '').replace('_TT', '_CC')] = {
                    number: 0,
                    percentage: 0,
                };
            }
            if (!dict[key.replace('_TT', '_LDR')]) {
                dict[key.replace('_TT', '_LDR')] = 0;
                statsDict[key.replace('radio-name-', '').replace('_TT', '_LDR')] = {
                    number: 0,
                    percentage: 0,
                };
            }
            const percentage = (dict[key] / (dict[key.replace('_TT', '')] + dict[key] + dict[key.replace('_TT', '_CC')] + dict[key.replace('_TT', '_LDR')])) * 100;
            statsDict[key.replace('radio-name-', '')] = {
                number: dict[key],
                percentage
            };
        } else if (key.endsWith('_LDR')) {
            if (!dict[key.replace('_LDR', '')]) {
                dict[key.replace('_LDR', '')] = 0;
                statsDict[key.replace('radio-name-', '').replace('_LDR', '')] = {
                    number: 0,
                    percentage: 0,
                };
            }
            if (!dict[key.replace('_LDR', '_CC')]) {
                dict[key.replace('_LDR', '_CC')] = 0;
                statsDict[key.replace('radio-name-', '').replace('_LDR', '_CC')] = {
                    number: 0,
                    percentage: 0,
                };
            }
            if (!dict[key.replace('_LDR', '')]) {
                dict[key.replace('_LDR', '')] = 0;
                statsDict[key.replace('radio-name-', '').replace('_LDR', '')] = {
                    number: 0,
                    percentage: 0,
                };
            }
            const percentage = (dict[key] / (dict[key.replace('_LDR', '')] + dict[key] + dict[key.replace('_LDR', '_CC')] + dict[key.replace('_LDR', '_TT')])) * 100;
            statsDict[key.replace('radio-name-', '')] = {
                number: dict[key],
                percentage
            };
        } else {
            if (!dict[`${key}_CC`]) {
                dict[`${key}_CC`] = 0;
                statsDict[`${key.replace('radio-name-', '')}_CC`] = {
                    number: 0,
                    percentage: 0
                };
            }
            if (!dict[`${key}_TT`]) {
                dict[`${key}_TT`] = 0;
                statsDict[`${key.replace('radio-name-', '')}_TT`] = {
                    number: 0,
                    percentage: 0
                };
            }
            if (!dict[`${key}_LDR`]) {
                dict[`${key}_LDR`] = 0;
                statsDict[`${key.replace('radio-name-', '')}_LDR`] = {
                    number: 0,
                    percentage: 0
                };
            }
            const percentage = (dict[key] / (dict[key] + dict[`${key}_CC`] + dict[`${key}_TT`] + dict[`${key}_LDR`])) * 100;
            statsDict[key.replace('radio-name-', '')] = {
                number: dict[key],
                percentage
            };
        }
    });

    const statsKeys = Object.keys(statsDict).sort();

    statsKeys.forEach((key, index) => {
        switch (index % 4) {
            case 0:
                console.log(chalk.red.inverse(`${key}:`), chalk.red(starLength(statsDict[key].number)), chalk.red.inverse(`${statsDict[key].percentage}%`));
                break;
            case 1:
                console.log(chalk.yellow.inverse(`${key}:`), chalk.yellow(starLength(statsDict[key].number)), chalk.yellow.inverse(`${statsDict[key].percentage}%`));
                break;
            case 2:
                console.log(chalk.green.inverse(`${key}:`), chalk.green(starLength(statsDict[key].number)), chalk.green.inverse(`${statsDict[key].percentage}%`));
                break;
            case 3:
                console.log(chalk.magenta.inverse(`${key}:`), chalk.magenta(starLength(statsDict[key].number)), chalk.magenta.inverse(`${statsDict[key].percentage}%`));
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