const request = require('request')

//reverse geocoding to find weather forcast
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9263f8b0e6969b5b51e6002c8f8566bc&query=' +  decodeURIComponent(latitude) + ',' +  decodeURIComponent(longitude) + '&units=f'

    request({ url, json:true}, (error, {body}) =>{
        if (error) {
            callback('Unable to connect to weather service', undefined)
            
        } else if (body.error) { //used in weatherstack api
            callback('Unable to find location', undefined)

        } else {
            callback(undefined, 'At ' +body.location.localtime +', in the '+ body.location.timezone_id + ' timezone. It is currently ' + body.current.temperature
            + ' degrees out, the sky is ' + body.current.weather_descriptions[0] + ' and, It feels like ' + body.current.feelslike +
            ' degrees out.')

        }
    })
}

module.exports = forecast