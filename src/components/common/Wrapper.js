import React, { Component } from 'react';

class Wrapper extends Component {
    render() {
        const { backgroundColor, horizontalAlign, additionalStyle, children } = this.props
        return (
            <div style={{ ...styles.wrapper, ...additionalStyle, backgroundColor: backgroundColor || 'whitesmoke' }}>
                <div style={{ ...styles.mainView, justifyContent: horizontalAlign || 'space-between' }}>
                    {children}
                </div>
            </div>
        )
    }
}

const styles = {
    wrapper: {
        display: 'flex',
        justifyContent: 'center'
    },
    mainView: {
        display: 'flex',
        width: '50rem'
    }
}

export default Wrapper;