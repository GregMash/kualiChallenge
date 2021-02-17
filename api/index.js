// -------------------------- Dependencies --------------------------

// csv file from Kuali
const csvFilePath = 'courses.csv';

// package to convert csv data to json
const csv = require('csvtojson');

// run data conversion to json
csv()
.fromFile(csvFilePath)
.then((jsonObj) => {
    console.log(jsonObj);
});