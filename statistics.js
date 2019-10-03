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
                    if (dict[`${key}_CC`] == undefined) {
                        dict[`${key}_CC`] = 1;
                    } else {
                        dict[`${key}_CC`] += 1;
                    }
                } else if(json[key].endsWith('_TT')) {
                    if (dict[`${key}_TT`] == undefined) {
                        dict[`${key}_TT`] = 1;
                    } else {
                        dict[`${key}_TT`] += 1;
                    }
                } else {
                    if (dict[key] == undefined) {
                        dict[key] = 1;
                    } else {
                        dict[key] += 1;
                    }
                }
            }
        });
    });
    const keys = Object.keys(dict).sort();
    keys.forEach(key => {
        if (key.endsWith('_CC')) {
            const percentage = (dict[key] / (dict[key] + dict[key.replace('_CC', '')] + dict[key.replace('_CC', '_TT')])) * 100;
            console.log(chalk.red.inverse(`${key.replace('radio-name-', '')}:`), chalk.red(starLength(dict[key])), chalk.red.inverse(`${percentage}%`));
        } else if(key.endsWith('_TT')) {
            const percentage = (dict[key] / (dict[key.replace('_TT', '')] + dict[key] + dict[`${key}_CC`])) * 100;
            console.log(chalk.yellow.inverse(`${key.replace('radio-name-', '')}:`), chalk.yellow(starLength(dict[key])), chalk.yellow.inverse(`${percentage}%`));
        } else {
            const percentage = (dict[key] / (dict[key] + dict[`${key}_CC`] + dict[`${key}_TT`])) * 100;
            console.log(chalk.green.inverse(`${key.replace('radio-name-', '')}:`), chalk.green(starLength(dict[key])), chalk.green.inverse(`${percentage}%`));
        }
    })
});

const starLength = (number) => {
    let str = '';
    for (var i = 0; i < number; ++i) {
        str += '*';
    }
    return str;
}