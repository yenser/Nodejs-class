const request = require('request');

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    if(error) {
      callback('Unable to connect to Google server.');
    }else if(body.status === 'ZERO_RESULTS') {
      callback('Unable to find that address.');
    }else if(body.status === 'OK') {
      // console.log('Address found\n-------------------');
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lat
      });
    }
  });
};

module.exports.geocodeAddress = geocodeAddress;
