const request = require('request')

const geocode = (address, callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURI(address) + '.json?access_token=pk.eyJ1IjoiamVzdXNoZWxseWVhaCIsImEiOiJjazF4MnU2MTcwN2t4M29xdDRwbHg5b2c3In0.bjE3lt7frFpuJ4QcKKujIQ&limit=1'

    request({url: geocodeURL, json: true}, (error, response) => {
       if (error) {
           callback('Not able to connect to geo location')      
       } else if (response.body.features.length === 0) {
           callback('Not able to get lat and long for this location')
       } else {
           let center = response.body.features[0].center
           callback(null, {latitude: center[1], 
               longitude: center[0],
               place: response.body.features[0].place_name}) 
       }
    })
}

module.exports = geocode