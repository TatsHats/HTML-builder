const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');
const readTxt = fs.createReadStream(filePath, 'utf-8');

// обработка событий
readTxt.on('data', (part) => {
    console.log(part);
});

readTxt.on('error', (error) => {
    console.error('Error:', error);
});

readTxt.on('end', () => {
    console.log('Reading finished.');
});