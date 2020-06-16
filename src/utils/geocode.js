const request = require('request')

const geoCode =  (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZGVzaG11a2hwcmFzaGFudDYxMyIsImEiOiJja2Ixem93MmowazVwMnZsb3pyeXY0NW93In0.l1bw-wtIUarpEAZBUKB4bg'

    request( { url, json : true}, function (err,{ body }) {
        if (err) {
            callback("Incorrect API",undefined)
        } else if (body.features.length === 0) {
            callback("No Data Found For Given Term",undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode