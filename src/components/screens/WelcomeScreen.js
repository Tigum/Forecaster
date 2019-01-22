import React, { Component } from 'react'
import Wrapper from '../common/Wrapper'
import Button from '../common/Button'
import history from '../history'
import { connect } from 'react-redux'
import { getCityByLatLong, loadingExport, clearErrors } from '../../actions/location_actions'
import { FaSun } from 'react-icons/fa'
import { IconContext } from "react-icons";
import { FiSearch, FiMapPin } from "react-icons/fi";
import Loader from '../common/Loader'

const FLEX_DIRECTION = window.innerWidth < 768 ? 'column' : 'row'
const FLEX_ORIENTATION = window.innerWidth < 768 ? 'center' : 'flex-start'
const TITLE_MARGIN_LEFT = window.innerWidth < 768 ? 0 : 25

class WelcomeScreen extends Component {

    //Helper function that gets latitude and longitude and pass them to the getCityByLatLong function
    getLatLong() {
        this.props.clearErrors()
        this.props.loadingExport(true)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords
                    this.props.getCityByLatLong(latitude, longitude)
                },
                (error) => alert(error)
            );
        }
    }

    //Helper function that redirects user to search screen and clear errors
    goToSearchCity() {
        history.push('/searchCity')
        this.props.clearErrors()
    }

    //Helper function that either loads the buttons or the Loader components, based on the loading prop value
    loadButtons() {
        const { loading, error } = this.props
        if (loading) {
            return (
                <div style={styles.rightDiv}>
                    <Loader size={8} />
                </div>
            )
        }

        return (
            <div style={styles.rightDiv}>
                <h5 style={styles.error}>{error || ''}</h5>
                <h3 style={styles.title2}>Get started below!</h3>
                <Button
                    id='search_city'
                    text='Choose your city'
                    customStyle={styles.button}
                    action={this.goToSearchCity.bind(this)}
                    fontStyle={styles.buttonFontStyle}
                    icon={<FiSearch />}
                    iconSize={20}
                    iconColor='white'
                />
                <Button
                    id='current_location'
                    text='Current location'
                    customStyle={styles.button}
                    action={this.getLatLong.bind(this)}
                    fontStyle={styles.buttonFontStyle}
                    icon={<FiMapPin />}
                    iconSize={20}
                    iconColor='white'
                />
            </div>
        )
    }

    render() {
        return (
            <Wrapper backgroundColor='white' horizontalAlign='center' additionalStyle={{ paddingTop: 70 }}>
                <div className='welcome' style={styles.mainDiv}>
                    <div style={styles.leftDiv}>
                        <div style={styles.leftInnerDiv}>
                            <IconContext.Provider value={{ color: 'dimgrey', size: '50', paddingLeft: 20 }}>
                                <FaSun />
                            </IconContext.Provider>
                            <h3 style={styles.title}>Forecaster</h3>
                        </div>
                        <h4 style={styles.description}>Check the latest forecast and weather for any city in the World.
                        We will show you all the information you need to know in order to find out
                        how the weather is in your favorite place. </h4>
                    </div>
                    {this.loadButtons()}
                </div>
            </Wrapper>
        )
    }
}

const styles = {
    mainDiv: {
        display: 'flex',
        flexDirection: FLEX_DIRECTION,
        backgroundColor: 'whitesmoke',
        marginTop: 40,
        textAlign: 'center',
        width: '100%',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10,
        minHeight: 490
    },
    button: {
        marginLeft: 80,
        marginRight: 80,
        marginBottom: 20,
        backgroundColor: '#2285a1',
        color: 'white',
        borderRadius: 10,
        borderColor: '#2285a1',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '12rem',
        justifyContent: 'center',
        outline: 'none',
        cursor: 'pointer'
    },
    leftDiv: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: FLEX_ORIENTATION,
        justifyContent: 'flex-start',
        textAlign: 'left',
        flex: 1,
        borderRightStyle: 'solid',
        borderRightWidth: 1,
        borderRightColor: '#e8e8e8',
    },
    leftInnerDiv: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'left',
        flex: 1,
        maxHeight: 200,
        marginLeft: TITLE_MARGIN_LEFT
    },
    rightDiv: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        flex: 1
    },
    title: {
        fontSize: 40,
        color: 'dimgrey',
        paddingLeft: 10
    },
    description: {
        paddingLeft: 25,
        paddingRight: 25,
        fontWeight: 100,
        color: 'dimgrey',
    },
    buttonFontStyle: {
        fontWeight: 100,
        fontSize: 15,
        paddingLeft: 7
    },
    title2: {
        fontWeight: 100,
        fontSize: '2rem',
        color: 'dimgrey'
    },
    error: {
        marginTop: 0,
        marginBottom: -5,
        color: '#b7b7b7'
    }
}

const mapStateToProps = ({ main }) => {
    const { loading, error } = main
    return { loading, error }
}

export default connect(mapStateToProps, { getCityByLatLong, loadingExport, clearErrors })(WelcomeScreen)

