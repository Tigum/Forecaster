import React, { Component } from 'react';
import ForecastListItem from './ForecastListItem'
import { connect } from 'react-redux'
import { FiX } from "react-icons/fi";
import { IconContext } from "react-icons";
import { resetApp } from '../../actions'
import history from '../history'

class ForecastList extends Component {

    //Helper function to load list of forecast items
    loadItems() {
        const { data } = this.props
        return data.map((item, i) => {
            return (
                <ForecastListItem
                    key={i}
                    item={item}
                />
            )
        })
    }

    //Helper function that redirects user to home screen, and set it to initial state
    onCloseClick() {
        history.push('/')
        this.props.resetApp()
    }

    render() {
        const { location } = this.props
        return (
            <div style={styles.list}>
                <div style={styles.textDiv}>
                    <h3 style={styles.text}>{location}</h3>
                    <div style={styles.icon} onClick={this.onCloseClick.bind(this)}>
                        <IconContext.Provider value={{ color: '#777777', size: '25' }}>
                            <FiX />
                        </IconContext.Provider>
                    </div>
                </div>
                {this.loadItems()}
            </div>
        )
    }
}

const styles = {
    list: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginTop: -2,
        marginBottom: 35
    },
    text: {
        color: '#777777',
        marginRight: 8
    },
    textDiv: {
        alignItems: 'center',
        flexDirection: 'row',
        display: 'flex',
        marginBottom: -21,
        marginTop: 14,
        marginLeft: 8
    },
    icon: {
        marginTop: 4,
        cursor: 'pointer'
    }
}

const mapStateToProps = ({ main }) => {
    const { location } = main
    return { location }
}

export default connect(mapStateToProps, { resetApp })(ForecastList);