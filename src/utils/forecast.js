const request = require('request')

const foreCast = (latitude,logitude,callback) => { 
    const url = 'http://api.weatherstack.com/current?access_key=c347495c00bc17ac2beb0699cc87b8be&query='+ latitude +','+ logitude +'&units=f'

    request( { url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to weather service!',undefined)    
        } else if (body.error) {
            callback('Unable to find location', undefined) 
        } else {
            callback(undefined, body.current.weather_descriptions[0]+' .Its currently '+body.current.temperature+' degree out. I feels like  '+body.current.feelslike+' degree out.')
        }
    })
}

module.exports = foreCast