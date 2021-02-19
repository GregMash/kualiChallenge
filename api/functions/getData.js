
require('dotenv').config();
const axios = require('axios');

module.exports = {

  getSubjectCodes: () => {
    // Make a request to API for subject codes
    return axios({
      method: 'GET',
      url: 'http://stucse.kuali.co/api/cm/options/types/subjectcodes',
      headers: {
        'Authorization': 'Bearer ' + process.env.KUALIKEY,
        'Content-Type': 'application/json'
      }
    })
      .then(function (response) {
        // handle success
        return response.data;

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  },

  getGroups: () => {
    return axios({
      method: 'GET',
      url: 'http://stucse.kuali.co/api/v1/groups',
      headers: {
        'Authorization': 'Bearer ' + process.env.KUALIKEY,
        'Content-Type': 'application/json'
      }
    })
      .then(function (response) {
        // handle success
        return response.data;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  },

  getCampuses: () => {
    return axios({
      method: 'GET',
      url: 'http://stucse.kuali.co/api/cm/options/types/campuses',
      headers: {
        'Authorization': 'Bearer ' + process.env.KUALIKEY,
        'Content-Type': 'application/json'
      }
    })
      .then(function (response) {
        // handle success
        return response.data;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }
};