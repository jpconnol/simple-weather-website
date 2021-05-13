const request = require('request')


const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=da8476fa0845caaafa717fb3ff0cd572&query=${lat},${long}&units=f`
    request({ url: url, json: true }, (err, res) => {
        if(err){
            callback(err)
        }
        else if(res.body.error){
            callback(res.body.error)
        } else {
            const {temperature, weather_descriptions:description} = res.body.current
            callback(undefined, {
                temperature: temperature,
                description: description
            })
        }
    })
}

module.exports = forecast