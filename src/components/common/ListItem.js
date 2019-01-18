import React, { Component } from 'react';
import { connect } from 'react-redux'
import { selectSearchedLocation } from '../../actions/location_actions'

class ListItem extends Component {

    //Helper function that selects location chosen by the user
    onSelectLocation() {
        const { item } = this.props
        this.props.selectSearchedLocation(item)
    }

    render() {
        const { item, additionalStyle, textColor } = this.props
        
        return (
            <div style={{...styles.textDiv, ...additionalStyle}} onClick={this.onSelectLocation.bind(this)}>
                <h3 style={{...styles.text, ...textColor}}>{item.matching_full_name}</h3>
            </div>
        )
    }
}

const styles = {
    text: {
        fontWeight: 200,
        color: '#505050',
        fontSize: '1.1rem',
        paddingLeft: 10
    },
    textDiv: {
        cursor: 'pointer'
    }
}
export default connect(null, { selectSearchedLocation })(ListItem)