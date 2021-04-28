const request = require('request')

//reverse geocoding to find weather forcast
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9263f8b0e6969b5b51e6002c8f8566bc&query=' 
    + latitude + ',' + longitude + '&units=f'

    request({ url, json:true}, (error, {body}) =>{
        if (error) {
            callback('Unable to connect to weather service', undefined)
            
        } else if (body.error) { //used in weatherstack api
            callback('Unable to find location', undefined)

        } else {
            callback(undefined, 'At ' +body.current.observation_time + ', it is currently ' + body.current.temperature
            + ' degrees out. The sky is ' + body.current.weather_descriptions[0] + ', but It feels like ' + body.current.feelslike +
            ' degrees out.')

        }
    })
}

module.exports = forecast