//Fetch IP Address
// Define function fetchMyIp which will asychronously return IP address using an API
// Find urll for IPv4

const fetchMyIp = require('./iss').fetchMyIp;
const fetchGeoCoordsByIp = require('./iss').fetchGeoCoordsByIp;
const fetchISSFlyOverTimes = require('./iss').fetchISSFlyOverTimes;
const nextISSTimesForMyLocation = require('./iss').nextISSTimesForMyLocation;

fetchMyIp((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log("It worked! Returned IP!:" , ip);
});

fetchGeoCoordsByIp(('99.235.64.82'), (error, coords) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log("It worked! Return", coords);
});

const coordinates = {latitude: '43.7500', longitude: '-79.20000'};
fetchISSFlyOverTimes((coordinates), (error, coords) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log(`It worked! Returned flyover times:` , coords);
});

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  for (const pass of passTimes) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${dateTime} for ${duration} seconds!`);
  }
});

