// -------------------------- Dependencies --------------------------
require('dotenv').config();
// csv file from Kuali
const csvFilePath = 'courses.csv';

// package to convert csv data to json
const csv = require('csvtojson');

// import function to modify and insert data
const insertData = require('./functions/insertData');


// run data conversion to json then run the data insert function
csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
        insertData(jsonObj)
    });
