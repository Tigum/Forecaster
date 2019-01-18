import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setUnit } from '../../actions/forecast_actions'

const BUTTONS_WIDTH = 100

class DegreeButtons extends Component {

    //Helper function that defines which unit to show
    onSelectUnit(event) {
        const { innerHTML } = event.target
        if (innerHTML === 'K') {
            this.props.setUnit('kelvin')
        }
        if (innerHTML === '°F') {
            this.props.setUnit('fahrenheit')
        }
        if (innerHTML === '°C') {
            this.props.setUnit('celsius')
        }
    }

    render() {
        const { unit, location } = this.props
        if (!location) return (<div></div>)
        return (
            <div style={styles.mainDiv}>
                <div onClick={this.onSelectUnit.bind(this)} style={unit === 'kelvin' ? styles.buttonActive : styles.button}>
                    <h4 style={styles.text}>K</h4>
                </div>
                <div onClick={this.onSelectUnit.bind(this)} style={unit === 'fahrenheit' ? { ...styles.buttonActive, ...styles.middleButton } : { ...styles.button, ...styles.middleButton }}>
                    <h4 style={styles.text}>°F</h4>
                </div>
                <div onClick={this.onSelectUnit.bind(this)} style={unit === 'celsius' ? styles.buttonActive : styles.button}>
                    <h4 style={styles.text}>°C</h4>
                </div>
            </div>
        )
    }
}

const styles = {
    mainDiv: {
        display: 'flex',
        flexDirection: 'row',
        width: BUTTONS_WIDTH,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 6
    },
    button: {
        width: BUTTONS_WIDTH / 3,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        color: 'white',
    },
    buttonActive: {
        width: BUTTONS_WIDTH / 3,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        color: '#2285a1',
    },
    text: {
        margin: 0,
        padding: 5
    },
    middleButton: {
        borderLeftStyle: 'solid',
        borderLeftWidth: 1,
        borderRightStyle: 'solid',
        borderRightWidth: 1,
        width: (BUTTONS_WIDTH / 3) + 2
    }
}

const mapStateToProps = ({ main }) => {
    const { unit, location } = main
    return { unit, location }
}

export default connect(mapStateToProps, { setUnit })(DegreeButtons)