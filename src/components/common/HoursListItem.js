import React, { Component } from 'react';
import moment from 'moment'
import {
    TiWeatherCloudy,
    TiWeatherDownpour,
    TiWeatherNight,
    TiWeatherShower,
    TiWeatherSnow,
    TiWeatherStormy,
    TiWeatherSunny,
    TiWeatherWindy,
    TiStopwatch
} from "react-icons/ti";
import { IconContext } from "react-icons";
import { connect } from 'react-redux'

class HoursListItem extends Component {

    //Helper function that loads the correct icon to every hour of a given day
    loadIcon(weather, hour) {
        if (weather === 'Thunderstorm') {
            return <TiWeatherStormy />
        }
        if (weather === 'Drizzle') {
            return <TiWeatherShower />
        }
        if (weather === 'Rain') {
            return <TiWeatherDownpour />
        }
        if (weather === 'Atmosphere') {
            return <TiWeatherWindy />
        }
        if (weather === 'Clear') {
            if (parseFloat(hour) > 18) {
                return <TiWeatherNight />
            }
            return <TiWeatherSunny />
        }
        if (weather === 'Clouds') {
            return <TiWeatherCloudy />
        }
        if (weather === 'Snow') {
            return <TiWeatherSnow />
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

    //Helper function that checks if current item is today or not. Based on that
    //it loads only the current temperature at the moment or the min and max temperature
    checkIfisToday() {
        const today = moment().format('DD/MM/YYYY')
        const { date, temp, temp_max, temp_min } = this.props.item
        if (today === date || this.props.item.noMoreForecast) {
            return this.loadCurrentUnitAndTemp(temp)
        }
        return this.loadCurrentUnitAndTemp(temp_min) + ' / ' + this.loadCurrentUnitAndTemp(temp_max)
    }

    render() {
        const { item } = this.props
        return (
            <div style={styles.mainDiv}>
                <div style={styles.leftDiv}>
                    <IconContext.Provider value={{ color: '#7b7b7b', size: '25' }}>
                        <TiStopwatch />
                    </IconContext.Provider>
                    <h5 style={{ ...styles.noMargin, paddingLeft: 10 }}>{item.hour}:00</h5>
                </div>
                <div style={styles.rightDiv}>
                    <IconContext.Provider value={{ color: '#7b7b7b', size: '25' }}>
                        {this.loadIcon(item.main, item.hour)}
                    </IconContext.Provider>
                    <h5 style={{ ...styles.noMargin, paddingLeft: 10 }}>{this.checkIfisToday()}</h5>
                </div>
            </div>
        )
    }
}

const styles = {
    mainDiv: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 15,

    },
    leftDiv: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    rightDiv: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    noMargin: {
        margin: 0,
        color: '#7b7b7b'
    },
}

const mapStateToProps = ({ main }) => {
    const { unit } = main
    return { unit }
}

export default connect(mapStateToProps, {})(HoursListItem)