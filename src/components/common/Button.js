import React, { Component } from 'react'
import { IconContext } from "react-icons";
import Loader from './Loader'
import { connect } from 'react-redux'

class Button extends Component {

    render() {
        const { text, customStyle, action, fontStyle, icon, iconSize, iconColor, loading } = this.props
        if (loading) {
            return (
                <button style={{ ...customStyle, backgroundColor: '#d8d8d8', borderColor: '#d8d8d8' }}>
                    <Loader text='Loading...' />
                </button>
            )
        }
        return (
            <button onClick={action} style={customStyle}>
                <IconContext.Provider value={{ color: iconColor, size: iconSize }}>
                    {icon}
                </IconContext.Provider>
                <h4 style={fontStyle}>{text}</h4>
            </button>
        )
    }
}

const mapStateToProps = ({ main }) => {
    const { loading } = main
    return { loading }
}
export default connect(mapStateToProps, {})(Button)