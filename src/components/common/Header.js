import React, { Component } from 'react';
import Wrapper from './Wrapper'
import { FaSun } from 'react-icons/fa'
import { IconContext } from "react-icons";
import history from '../../components/history'
import { connect } from 'react-redux'
import DegreeButtons from './DegreeButtons'
import { resetApp } from '../../actions/forecast_actions'

const PADDING_SIDES = 15

class Header extends Component {

    //Helper function that redirects user to main page, and set application to its initial state
    onClickLogo() {
        this.props.resetApp()
        history.push('/')
    }

    render() {

        return (
            <Wrapper backgroundColor='#41849e' additionalStyle={styles.fixPosition}>
                <div style={styles.innerDiv} onClick={this.onClickLogo.bind(this)}>
                    <IconContext.Provider value={{ color: 'white', size: '30' }}>
                        <FaSun />
                    </IconContext.Provider>
                    <h3 style={styles.textLeft}>Forecaster</h3>
                </div>
                <div style={styles.innerDiv}>
                    <h3 style={styles.textRight}><DegreeButtons /></h3>
                </div>
            </Wrapper>
        )
    }
}

const styles = {
    textLeft: {
        fontFamily: 'Roboto',
        color: 'white',
        paddingLeft: PADDING_SIDES
    },
    textRight: {
        fontFamily: 'Roboto',
        color: 'white',
        paddingRight: PADDING_SIDES
    },
    innerDiv: {
        display: 'flex',
        alignItems: 'center',
        paddingRight: 6,
        paddingLeft: 6,
        height: '5rem',
        cursor: 'pointer'
    },
    fixPosition: {
        position: 'fixed',
        top: 0,
        width: '100%'
    }
}

export default connect(null, { resetApp })(Header);