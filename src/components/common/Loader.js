import React from 'react';
import { GridLoader } from 'react-spinners';

const Loader = (props) => {
    const { text, size } = props
    return (
        <div style={styles.loaderDiv}>
            <GridLoader
                sizeUnit={"px"}
                size={size || 4}
                color={'dimgrey'}
                width={1}
            />
            <h5 style={styles.text}>{text}</h5>
        </div>
    )
}

const styles = {
    loaderDiv: {
        textAlign: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        marginTop: 5
    },
    text: {
        fontWeight: 100,
        color: 'dimgrey',
        margin: 0,
        marginTop: 5
    }
}

export default Loader