const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=eeb7aa2c8f04c955b3be3200ffa7c277&query=${longitude},${latitude}&units=f`

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        }  else {
            const temp = body.current.temperature
            const feelsLike = body.current.feelslike
            const weatherDescription = body.current.weather_descriptions[0]
            const humidity = body.current.humidity
            callback(undefined, `${weatherDescription}. It is currently ${temp} degrees out. It feels like ${feelsLike} degrees out. The humidity is ${humidity}%.`)
        }
    })
}

module.exports = forecast