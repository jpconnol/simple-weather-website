const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoiam9jb25uIiwiYSI6ImNrb2toZGtucTBkbXIydm5xbWVkaGgwZ3YifQ.3hB7cCpziTqJdmjFF7IY5A&limit=1`
    request({ url: url, json: true }, (err, res) => {
        if(err){
            callback('Unable to connect.')
        } else if(res.body.features.length === 0){
            callback('Error: No Location Found. Try Again.')
        } else{
            const {place_name: place, center} = res.body.features[0]
            const latitude = center[1]
            const longitude = center[0]
            callback(undefined, {
                latitude,
                longitude,
                place
            })
        }
    })
}

module.exports = geocode