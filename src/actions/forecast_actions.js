import { SET_FORECAST, SET_UNIT, RESET_APP, LOADING, ERROR } from './types'
import history from '../components/history'
import axios from 'axios'
import moment from 'moment'

const API_KEY = 'fc0ae18fc51cd8081f7bb694222ddba4'

//Function that retrives the data from the OpenWeatherMap API and format it into a easy way of using it on the front end
export const loadForecast = (lat, lon) => async (dispatch) => {

    try {
        //Retrieving data from API
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${API_KEY}`)
        const { list } = response.data

        //Formatting each item from the array retrieved from API
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

        //Setting the days to be displayed in the forecast
        const days = [
            moment().format('DD/MM/YYYY'),
            moment().add(1, 'days').format('DD/MM/YYYY'),
            moment().add(2, 'days').format('DD/MM/YYYY'),
            moment().add(3, 'days').format('DD/MM/YYYY'),
            moment().add(4, 'days').format('DD/MM/YYYY'),
            moment().add(5, 'days').format('DD/MM/YYYY')
        ]

        //Mounting array that will be used to display necessary info in the front end
        let completeForecast = []
        for (let i = 0; i < days.length; i++) {
            let info = []
            forecast.forEach((element) => {

                if (days[i] === element.date) {
                    info.push(element)
                }
            })

            const singleDay = {
                date: days[i],
                dayForecast: info
            }
            completeForecast.push(singleDay)
        }

        //This `if` statement takes care of the forecast for the current day after 9pm,
        //The link in line 13 retrieves the weather every 3 hours, and past 9pm it doesn't retrieve anything for the current day
        //So this `if` block reaches a different path in the API to get the current weather after 9pm and display it to the user
        if (!completeForecast[0].dayForecast || completeForecast[0].dayForecast.length < 1) {
            completeForecast.shift()

            try {
                const weatherAfterNine = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
                const weather_data = weatherAfterNine.data
                const date_ISOString2 = moment().toISOString()
                const forecastItem2 = {
                    date_ISOString: date_ISOString2,
                    dateAndTime: moment(date_ISOString2).format('YYYY-MM-DD HH:mm:ss'),
                    date: moment(date_ISOString2).format('DD/MM/YYYY'),
                    hour: moment(date_ISOString2).format('HH'),
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
                    date: moment(date_ISOString2).format('DD/MM/YYYY'),
                    dayForecast: [forecastItem2]
                }

                completeForecast.unshift(newWeather)

                //Dispatch data to redux store in case the current time is 9pm or after
                dispatch({
                    type: SET_FORECAST,
                    payload: completeForecast
                })
                loading(dispatch, false)
                return

            } catch (err) {
                alert(err)
                return
            }
        }

        //Dispatch data to redux store in case the current time is before 9pm
        dispatch({
            type: SET_FORECAST,
            payload: completeForecast
        })
        loading(dispatch, false)
        return

    } catch (err) {
        //If nothing is retrieved it handles error and returns to main screen
        error(dispatch, 'No location was selected. Please try again!')
        loading(dispatch, false)
        history.push('/')
        return
    }
}

// Action to set current degree unit
export const setUnit = (unit) => {
    return {
        type: SET_UNIT,
        payload: unit
    }
}

// Action to set application to initial state
export const resetApp = () => {
    return {
        type: RESET_APP
    }
}

//Function to set loading prop to true or false
const loading = (dispatch, input) => {
    dispatch({
        type: LOADING,
        payload: input
    })
}

//Function to dispatch an error
const error = (dispatch, text) => {
    dispatch({
        type: ERROR,
        payload: text
    })
}