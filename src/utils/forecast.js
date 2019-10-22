const request = require('request')

const forecast = (latitide, longitude, place, callback) => {
    let url = `https://api.darksky.net/forecast/e6af5b5feb891b272e18f5e2fc0370a6/${latitide},${longitude}?units=si`
    request({url : url, json : true}, (error, response) => {
        if (error) {
            callback('Not able to connect to darksky', null)  
        } else if(response.error) {
            callback('Please set the correct location', null)
        } else {
            const currently = response.body.currently
            let temperature = currently.temperature
            let rainChance  = currently.precipProbability
            callback(null, {temperature, rainChance, place})
        }
    })  
}

module.exports = forecast