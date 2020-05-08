const request = require('request');
const fetchMyIp = function(callback) {
  //use request to fetch ip address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetchin IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    if (ip) {
      callback(null, ip);
    }
  });
};

const fetchGeoCoordsByIp = (ip, callback) => {
  request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinate for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const location = {};
    location['latitude'] = JSON.parse(body).data.latitude;
    location['longitude'] = JSON.parse(body).data.longitude;
    callback(null, location);
  });
};
//Single API request to retrieve upcomig ISS fly over times for my coords
//Inputs: object with keys latitude and longitude
//Returns (via callback) => an error if any, the fly over times as an array [{risetimes: some number, duration: some number}]
const fetchISSFlyOverTimes = (latAndLong, callback) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=${latAndLong.latitude}&lon=${latAndLong.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Staus code ${response.statusCode} when fetching fly over times for the ISS. Response: ${response}`;
      callback(Error(msg), null);
      return;
    }

    const flyOverTimes = JSON.parse(body).response;
    callback(null, flyOverTimes);
  });
};

//Orchestrates multiple API requests to determine next 5 upcoming iss fly overs
//Input a callback with (error, results)
//Return an error or the fly over times
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIp((error, ip) => {
    if (error) {
      console.log(error);
      return;
    }

    fetchGeoCoordsByIp(ip, (error, coords) => {
      if (error) {
        console.log(error);
        return;
      }

      fetchISSFlyOverTimes(coords, (error, times) => {
        if (error) {
          console.log(error);
          return;
        }
        callback(null, times);
      });
    });
  });
};

module.exports = {fetchMyIp, fetchGeoCoordsByIp, fetchISSFlyOverTimes, nextISSTimesForMyLocation,};