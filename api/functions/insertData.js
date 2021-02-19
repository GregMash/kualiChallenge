// -------------------------- Dependencies --------------------------
equire('dotenv').config();
const axios = require('axios');

const { getSubjectCodes, getGroups, getCampuses } = require('./getData');

const insertData = async (dataArr) => {

  const subjectCodes = await getSubjectCodes();
  const groups = await getGroups();
  const campuses = await getCampuses();

  dataArr.map(course => {

    // destruct needed fields
    let { number, title, creditType, creditsMin, creditsMax, dateStart, subjectCode, campus, department } = course;

    // find the id of the subject code in the array that matches the course subject code
    const newSubCode = subjectCodes.find(subCode => subCode.name === subjectCode).id;
    // find the group
    const groupSearch = groups.find(group => group.name === department);

    let groupFilter1;
    let groupFilter2;
    if (groupSearch) {
      groupFilter1 = groupSearch.id;
      groupFilter2 = groupSearch.parentId;
    }

    // find the campus
    const splitCampus = campus.split(',');
    const replaceCampus = splitCampus.map(el => campuses.find(campus => campus.name === el).id);
    let newCampus = replaceCampus.reduce((acc, curr) => (acc[curr] = true, acc), {});

    // create credits field based on creditType
    let credits;
    if (creditType === 'fixed') {
      credits = {
        "chosen": "fixed",
        "credits": {
          "min": creditsMin,
          "max": creditsMin
        },
        "value": creditsMin
      }
    } else if (creditType === 'multiple') {
      credits = {
        "chosen": "multiple",
        "credits": {
          "max": creditsMax,
          "min": creditsMin
        },
        "value": [
          creditsMin,
          creditsMax
        ]
      }
    } else if (creditType === 'range') {
      credits = {
        "chosen": "range",
        "credits": {
          "min": creditsMin,
          "max": creditsMax
        },
        "value": {
          "min": creditsMin,
          "max": creditsMax
        }
      }
    };

    // format date
    const season = dateStart.split(" ")[0];
    const year = dateStart.split(" ")[1];
    let newDateStart;
    if (season === "Fall") {
      newDateStart = `${year}-10-04`;
    } else if (season === "Winter") {
      newDateStart = `${year}-01-04`;
    } else if (season === "Spring") {
      newDateStart = `${year}-04-04`;
    } else if (season === "Summer") {
      newDateStart = `${year}-07-04`;
    };


    let newData = {
      subjectCode: newSubCode,
      number,
      title,
      credits,
      status: 'draft',
      dateStart: newDateStart,
      groupFilter1,
      groupFilter2,
      campus: newCampus,
      notes: "Submitted by Gregory Mash. Thanks Kuali team, that was fun!"
    };

    // omit unpopulated data
    Object.keys(newData).forEach(key => newData[key] === undefined ? delete newData[key] : {});

    return axios({
      method: 'POST',
      url: 'http://stucse.kuali.co/api/cm/courses/',
      headers: {
        'Authorization': 'Bearer ' + process.env.KUALIKEY,
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
      // handle success
      return console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  })
}

module.exports = insertData;