import moment from 'moment'

//Function created for testing purposes
const loadForecast = (data, weatherData) => async () => {

    const { list } = data

    let forecast = []
    list.forEach((item) => {
        moment.defaultFormat = 'YYYY-MM-DD HH:mm:ss'
        const dateAndTime = item.dt_txt
        const date = moment(dateAndTime, moment.defaultFormat).format('DD/MM/YYYY')
        const hour = moment(dateAndTime, moment.defaultFormat).format('HH')
        const { humidity, pressure, temp, temp_max, temp_min } = item.main
        const { main, description } = item.weather[0]
        const { speed } = item.wind
        const date_ISOString = moment(dateAndTime, moment.defaultFormat).toISOString()

        const forecastItem = {
            date_ISOString,
            dateAndTime,
            date,
            hour,
            humidity,
            pressure,
            temp,
            temp_max,
            temp_min,
            main,
            description,
            speed
        }
        forecast.push(forecastItem)
    })

    const today = moment().format('DD/MM/YYYY')
    const day01 = moment().add(1, 'days').format('DD/MM/YYYY')
    const day02 = moment().add(2, 'days').format('DD/MM/YYYY')
    const day03 = moment().add(3, 'days').format('DD/MM/YYYY')
    const day04 = moment().add(4, 'days').format('DD/MM/YYYY')
    const day05 = moment().add(5, 'days').format('DD/MM/YYYY')

    const days = [
        today,
        day01,
        day02,
        day03,
        day04,
        day05
    ]

    let completeForecast = []
    days.forEach((day) => {
        let info = []
        forecast.forEach((element) => {

            if (day === element.date) {
                info.push(element)
            }
        })

        const singleDay = {
            date: day,
            dayForecast: info
        }
        completeForecast.push(singleDay)
    })

    if (!completeForecast[0].dayForecast || completeForecast[0].dayForecast.length < 1) {
        completeForecast.shift()

        const weather_data = weatherData

        const date_ISOString2 = moment().toISOString()
        const dateAndTime2 = moment(date_ISOString2).format('YYYY-MM-DD HH:mm:ss')
        const date2 = moment(date_ISOString2).format('DD/MM/YYYY')
        const hour2 = moment(date_ISOString2).format('HH')

        const forecastItem2 = {
            date_ISOString: date_ISOString2,
            dateAndTime: dateAndTime2,
            date: date2,
            hour: hour2,
            humidity: weather_data.main.humidity,
            pressure: weather_data.main.pressure,
            temp: weather_data.main.temp,
            temp_max: weather_data.main.temp_max,
            temp_min: weather_data.main.temp_min,
            main: weather_data.weather[0].main,
            description: weather_data.weather[0].description,
            speed: weather_data.wind.speed,
            noMoreForecast: true
        }

        const newWeather = {
            date: date2,
            dayForecast: [forecastItem2]
        }

        completeForecast.unshift(newWeather)

        return completeForecast


    }
    return completeForecast
}

export default loadForecast