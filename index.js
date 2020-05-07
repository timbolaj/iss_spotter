//Fetch IP Address
// Define function fetchMyIp which will asychronously return IP address using an API
// Find urll for IPv4

const fetchMyIP = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log("It worked! Returned IP!:" , ip);
});