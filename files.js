const fs = require('fs');
const path = require('path');

const writeDownFilenames = (directory) => {
    fs.readdir(path.join(__dirname, 'public', directory), (err, files) => {
        console.log(err);
        fs.writeFileSync('filenames.txt', files);
    });
};

// writeDownFilenames('images/GIMP HDR');

const keys = fs.readFileSync(path.join(__dirname, 'filenames.txt')).toString().split(',').map(key => key.split('\.')[0]);
let dict = {};

const createSpaceSeparatedDictionary = (keys, dict) => {
    keys.forEach(key => {
        let result = key.replace(/([A-Z])/g, " $1");
        let finalResult = result.charAt(0).toUpperCase() + result.slice(1); // capitalize the first letter - as an example.
        dict[key] = finalResult.trim();
    });
};

// createSpaceSeparatedDictionary(keys, dict);

// fs.writeFileSync(path.join(__dirname, 'spaceSeparatedFilenames.json'), JSON.stringify(dict));

const json = JSON.parse(fs.readFileSync(path.join(__dirname, 'spaceSeparatedFilenames.json')));
console.log(json);