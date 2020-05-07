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

module.exports = fetchMyIp;