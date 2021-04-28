const request = require('request') 


//callback will hold the longitude and latitude of location
const geocode = (address, callback) => {
    
    //address needs to be wrapped in encodeURIComponent() to decode it in URL search
   const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWlja'+
   'GFlbC1kZWhhbmV5IiwiYSI6ImNrbnN6ZzM3NTI5OWYybnB1Y3pwb3ZoMjMifQ.cg3SozoAoBIKv8x65V5jAw&limit=1'

    request({url, json:true}, (error, {body}) => {
        
        if (error) {
            
            callback('Unable to connect to location services!', undefined)

        } else if (body.features.length === 0) {
            callback('Unable to find location, try again.', undefined)
        
        } else {
           
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name

            })
        }

    })

}

//exporting geocode to app.js(main)
module.exports = geocode