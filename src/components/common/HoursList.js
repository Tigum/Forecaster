import React, { Component } from 'react';
import HoursListItem from './HoursListItem'

class HoursList extends Component {

    //Helper function to load list of hours of a given day
    loadItems() {
        const { data } = this.props
        return data.map((item, i) => {
            return (
                <HoursListItem
                    key={i}
                    item={item}
                />
            )
        })
    }

    render() {
        return (
            <div style={styles.list}>
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
        paddingRight: 15
    }
}


export default HoursList;