import React, { Component } from 'react';
import { connect } from 'react-redux'
import moment from 'moment'
import {
    TiWeatherCloudy,
    TiWeatherDownpour,
    TiWeatherNight,
    TiWeatherShower,
    TiWeatherSnow,
    TiWeatherStormy,
    TiWeatherSunny,
    TiWeatherWindy
} from "react-icons/ti";
import { IconContext } from "react-icons";
import HoursList from './HoursList'

class ForecastListItem extends Component {

    //Helper function that generates the correct icon and weather description in each forecast card
    loadIcon(weather, hour) {

        if (weather === 'Thunderstorm') {
            return (
                <div>
                    <TiWeatherStormy />
                    <h3 style={styles.forecastText}>Thunderstorm</h3>
                </div>
            )
        }
        if (weather === 'Drizzle') {
            return (
                <div>
                    <TiWeatherShower />
                    <h3 style={styles.forecastText}>Drizzle</h3>
                </div>
            )
        }
        if (weather === 'Rain') {
            return (
                <div>
                    <TiWeatherDownpour />
                    <h3 style={styles.forecastText}>Rain</h3>
                </div>
            )
        }
        if (weather === 'Atmosphere') {
            return (
                <div>
                    <TiWeatherWindy />
                    <h3 style={styles.forecastText}>Atmosphere</h3>
                </div>
            )
        }
        if (weather === 'Clear') {
            if (parseFloat(hour) > 18) {
                return (
                    <div>
                        <TiWeatherNight />
                        <h3 style={styles.forecastText}>Clear</h3>
                    </div>
                )
            }
            return (
                <div>
                    <TiWeatherSunny />
                    <h3 style={styles.forecastText}>Clear</h3>
                </div>
            )
        }
        if (weather === 'Clouds') {
            return (
                <div>
                    <TiWeatherCloudy />
                    <h3 style={styles.forecastText}>Clouds</h3>
                </div>
            )
        }
        if (weather === 'Snow') {
            return (
                <div>
                    <TiWeatherSnow />
                    <h3 style={styles.forecastText}>Snow</h3>
                </div>
            )
        }
    }

    //Helper function that formats the temperature value to the selected unit
    loadCurrentUnitAndTemp(temp) {
        const { unit } = this.props
        if (unit === 'celsius') {
            const celsiusTemp = temp - 273.15
            if (celsiusTemp < 0 && celsiusTemp > -1) return (celsiusTemp * (-1)).toFixed(0) + ' °C'
            return celsiusTemp.toFixed(0) + ' °C'
        }

        if (unit === 'fahrenheit') {
            const fahrenheitTemp = (temp - 273.15) * (9 / 5) + 32
            if (fahrenheitTemp < 0 && fahrenheitTemp > -1) return (fahrenheitTemp * (-1)).toFixed(0) + ' °C'
            return fahrenheitTemp.toFixed(0) + ' °F'
        }

        if (temp < 0 && temp > -1) return (temp * (-1)).toFixed(0) + ' °C'
        return temp.toFixed(0) + ' K'
    }

    //Helper function that determines the min and max temperature of the day
    loadMinAndMaxTempsOfTheDay() {
        const { item } = this.props
        let temps = []

        item.dayForecast.forEach((day) => {
            temps.push(day.temp_min)
            temps.push(day.temp_max)
        })

        temps.sort()
        const min = temps[0]
        const max = temps[temps.length - 1]

        return this.loadCurrentUnitAndTemp(min) + ' / ' + this.loadCurrentUnitAndTemp(max)
    }

    //Helper function that loads the weather for the current day, and the next 5 days
    loadForecast() {
        const today = moment().format('DD/MM/YYYY')
        const { item } = this.props
        if (item && item.date !== undefined) {
            if (today === item.date) {
                return (

                    <div style={styles.todayDiv} className='today_div'>
                        <div style={styles.todayTopDiv01}>
                            <h1 style={styles.todayText}>Today</h1>
                            <h1 style={styles.todayText}>{this.loadCurrentUnitAndTemp(item.dayForecast[0].temp)}</h1>
                        </div>
                        <div style={styles.todayTopDiv02}>
                            <IconContext.Provider value={{ color: 'white', size: '100' }}>
                                {this.loadIcon(item.dayForecast[0].main, item.dayForecast[0].hour)}
                            </IconContext.Provider>
                        </div>
                        <div style={styles.todayTopDiv03}>
                            <h4>{moment().format('MMMM Do YYYY, h:mm a')}</h4>
                            <h6 style={styles.humidity}>Humidity: {item ? item.dayForecast[0].humidity : ''}%</h6>
                            <h6 style={styles.wind}>Wind: {item ? (item.dayForecast[0].speed * 3.6).toFixed(0) : ''} km/h</h6>
                        </div>
                        <div style={styles.todayTopDiv04}>
                            <HoursList data={item.dayForecast} />
                        </div>
                    </div>
                )
            }
        }


        return (
            <div style={styles.todayDiv} className='forecast_div'>
                <div style={styles.todayTopDiv01}>
                    <h1 style={styles.todayText}>
                        {
                            item && item.dayForecast !== undefined && item.dayForecast[1]
                                ?
                                moment(item.dayForecast[1].date_ISOString).format('dddd')
                                :
                                'Not available yet'
                        }
                    </h1>
                    <h2 style={styles.todayText}>
                        {
                            item && item.dayForecast !== undefined && item.dayForecast[1]
                                ?
                                this.loadMinAndMaxTempsOfTheDay()
                                :
                                ''
                        }
                    </h2>
                </div>
                <div style={styles.todayTopDiv02}>
                    <IconContext.Provider value={{ color: 'white', size: '100' }}>
                        {
                            item && item.dayForecast !== undefined && item.dayForecast[2] && item.dayForecast[0]
                                ?
                                this.loadIcon(item.dayForecast[2].main, item.dayForecast[0].hour)
                                :
                                ''
                        }
                    </IconContext.Provider>
                </div>
                <div style={styles.todayTopDiv03}>
                    <h4>
                        {
                            item && item.dayForecast !== undefined && item.dayForecast[1]
                                ?
                                moment(item.dayForecast[1].date_ISOString).format('MMMM Do, YYYY')
                                :
                                ''
                        }
                    </h4>
                </div>
                <div style={styles.todayTopDiv04}>
                    <HoursList data={item && item.dayForecast !== undefined ? item.dayForecast : []} />
                </div>
            </div>
        )

    }

    render() {
        return this.loadForecast()
    }
}

const styles = {
    todayDiv: {
        padding: 6,
        marginTop: 20
    },
    todayTopDiv01: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#006287',
        color: 'white',
        alignItems: 'center'
    },
    todayTopDiv02: {
        textAlign: 'center',
        backgroundColor: '#006287',
        alignItems: 'center',
        paddingBottom: 30,
        marginTop: -20
    },
    todayTopDiv03: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        color: 'white',
        alignItems: 'flex-start',
        backgroundColor: '#006287',
        marginTop: -34,
        paddingLeft: 15
    },
    todayTopDiv04: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: '#efefef',
        color: 'dimgrey',
        alignItems: 'center',
        paddingLeft: 15
    },
    todayText: {
        padding: 15,
        margin: 0
    },
    forecastText: {
        color: 'white',
        fontWeight: 100
    },
    humidity: {
        marginTop: -11,
        marginBottom: 0
    },
    wind: {
        marginTop: 6,
        marginBottom: 18
    }
}

const mapStateToProps = ({ main }) => {
    const { unit, location } = main
    return { unit, location }
}

export default connect(mapStateToProps, {})(ForecastListItem)