const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

const getDict = (files) => {

    let dict = {};

    files.forEach(file => {

        const json = JSON.parse(fs.readFileSync(path.join(__dirname, 'public', 'users', file)));
        const keys = Object.keys(json);
        keys.forEach(key => {
            if (key !== 'username') {
                if (json[key] == 'HDR') {
                    if (!dict[`${key}_HDR`]) {
                        dict[`${key}_HDR`] = 1;
                    } else {
                        dict[`${key}_HDR`] += 1;
                    }
                } else if (json[key] == 'ALG') {
                    if (!dict[`${key}_ALG`]) {
                        dict[`${key}_ALG`] = 1;
                    } else {
                        dict[`${key}_ALG`] += 1;
                    }
                } else if (json[key] == 'LDR') {
                    if (!dict[`${key}_LDR`]) {
                        dict[`${key}_LDR`] = 1;
                    } else {
                        dict[`${key}_LDR`] += 1;
                    }
                } else {
                    if (!dict[`${key}_CNN`]) {
                        dict[`${key}_CNN`] = 1;
                    } else {
                        dict[`${key}_CNN`] += 1;
                    }
                }
            }
        });
    });

    return dict;

};

const getStatsDict = (keys, dict) => {

    let statsDict = {};

    keys.forEach(key => {
        if (key.endsWith('_LDR')) {
            if (!dict[key.replace('_LDR', '_CNN')]) {
                dict[key.replace('_LDR', '_CNN')] = 0;
                statsDict[key.replace('-radio-options', '').replace('_LDR', '_CNN')] = {
                    number: 0,
                    percentage: 0,
                };
            }
            if (!dict[key.replace('_LDR', '_ALG')]) {
                dict[key.replace('_LDR', '_ALG')] = 0;
                statsDict[key.replace('-radio-options', '').replace('_LDR', '_ALG')] = {
                    number: 0,
                    percentage: 0,
                };
            }
            if (!dict[key.replace('_LDR', '_HDR')]) {
                dict[key.replace('_LDR', '_HDR')] = 0;
                statsDict[key.replace('-radio-options', '').replace('_LDR', '_HDR')] = {
                    number: 0,
                    percentage: 0,
                };
            }
            const percentage = (dict[key] / (dict[key] + dict[key.replace('_LDR', '_CNN')] + dict[key.replace('_LDR', '_ALG')] + dict[key.replace('_LDR', '_HDR')])) * 100;
            statsDict[key.replace('-radio-options', '')] = {
                number: dict[key],
                percentage
            };
        } else if (key.endsWith('_ALG')) {
            if (!dict[key.replace('_ALG', '_CNN')]) {
                dict[key.replace('_ALG', '_CNN')] = 0;
                statsDict[key.replace('-radio-options', '').replace('_ALG', '_CNN')] = {
                    number: 0,
                    percentage: 0,
                };
            }
            if (!dict[key.replace('_ALG', '_HDR')]) {
                dict[key.replace('_ALG', '_HDR')] = 0;
                statsDict[key.replace('-radio-options', '').replace('_ALG', '_HDR')] = {
                    number: 0,
                    percentage: 0,
                };
            }
            if (!dict[key.replace('_ALG', '_LDR')]) {
                dict[key.replace('_ALG', '_LDR')] = 0;
                statsDict[key.replace('-radio-options', '').replace('_ALG', '_LDR')] = {
                    number: 0,
                    percentage: 0,
                };
            }
            const percentage = (dict[key] / (dict[key.replace('_ALG', '_CNN')] + dict[key] + dict[key.replace('_ALG', '_HDR')] + dict[key.replace('_ALG', '_LDR')])) * 100;
            statsDict[key.replace('-radio-options', '')] = {
                number: dict[key],
                percentage
            };
        } else if (key.endsWith('_CNN')) {
            if (!dict[key.replace('_CNN', '_ALG')]) {
                dict[key.replace('_CNN', '_ALG')] = 0;
                statsDict[key.replace('-radio-options', '').replace('_CNN', '_ALG')] = {
                    number: 0,
                    percentage: 0,
                };
            }
            if (!dict[key.replace('_CNN', '_LDR')]) {
                dict[key.replace('_CNN', '_LDR')] = 0;
                statsDict[key.replace('-radio-options', '').replace('_CNN', '_LDR')] = {
                    number: 0,
                    percentage: 0,
                };
            }
            if (!dict[key.replace('_CNN', '_HDR')]) {
                dict[key.replace('_CNN', '_HDR')] = 0;
                statsDict[key.replace('-radio-options', '').replace('_CNN', '_HDR')] = {
                    number: 0,
                    percentage: 0,
                };
            }
            const percentage = (dict[key] / (dict[key.replace('_CNN', '_HDR')] + dict[key] + dict[key.replace('_CNN', '_LDR')] + dict[key.replace('_CNN', '_ALG')])) * 100;
            statsDict[key.replace('-radio-options', '')] = {
                number: dict[key],
                percentage
            };
        } else if (key.endsWith('_HDR')) {
            if (!dict[key.replace('_HDR', '_ALG')]) {
                dict[key.replace('_HDR', '_ALG')] = 0;
                statsDict[key.replace('-radio-options', '').replace('_HDR', '_ALG')] = {
                    number: 0,
                    percentage: 0
                };
            }
            if (!dict[key.replace('_HDR', '_LDR')]) {
                dict[key.replace('_HDR', '_LDR')] = 0;
                statsDict[key.replace('-radio-options', '').replace('_HDR', '_LDR')] = {
                    number: 0,
                    percentage: 0
                };
            }
            if (!dict[key.replace('_HDR', '_CNN')]) {
                dict[key.replace('_HDR', '_CNN')] = 0;
                statsDict[key.replace('-radio-options', '').replace('_HDR', '_CNN')] = {
                    number: 0,
                    percentage: 0
                };
            }
            const percentage = (dict[key] / (dict[key.replace('_HDR', '_CNN')] + dict[key] + dict[key.replace('_HDR', '_LDR')] + dict[key.replace('_HDR', '_ALG')])) * 100;
            statsDict[key.replace('-radio-options', '')] = {
                number: dict[key],
                percentage
            };
        }
    });

    return statsDict;

};

const getStatsDictFromApi = (req, res, next) => {

    fs.readdir(path.join(__dirname, 'public', 'users'), (err, files) => {
        if (err) {
            console.log(chalk.red.inverse('Greska pri citanju direktorijuma sa korisnicima.'));
            console.log(chalk.red(err));
            return res.json(err);
        }
        let dict = getDict(files);
        const keys = Object.keys(dict).sort();
        let statsDict = getStatsDict(keys, dict);
        req.statsDict = statsDict;
        next();

    });
}

module.exports = {
    getDict: getDict,
    getStatsDict: getStatsDict,
    getStatsDictFromApi: getStatsDictFromApi
}