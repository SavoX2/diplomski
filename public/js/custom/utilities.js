const fs = require('fs');
const chalk = require('chalk');
const path = require('path')

const imagePath = './public/images/';

const getImages = (req, res, next) => {
    fs.readdir(imagePath, (err, items) => {
        if (err) {
            console.log(chalk.red.inverse('Greska pri citanju direktorijuma sa slikama.'));
            console.log(chalk.red(err));
            res.json(err);
        } else {
            // console.log('ovdje', items);
            let images = items; //.filter(item => item.endsWith('jpg'));
            images.forEach((part, index) => {
                images[index] = '/images/' + images[index];
            });
            req.images = images;
            next();
        }
    });
};

module.exports = {
    getImages: getImages, 
}