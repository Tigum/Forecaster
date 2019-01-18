import React, { Component } from 'react';
import Wrapper from './Wrapper'
import { connect } from 'react-redux'
import { searchInputChanged } from '../../actions'
import { FiX } from "react-icons/fi";
import { IconContext } from "react-icons";
import { resetApp } from '../../actions'
import history from '../history'

class SearchInput extends Component {

    //Helper function that sends the text input value to action, and sets it as searchInput prop
    onChangeSearchInput(event) {
        const { value } = event.target
        this.props.searchInputChanged(value)
    }

    //Helper function that redirects user to main screen and sets app to its initial state
    onCloseClick() {
        history.push('/')
        this.props.resetApp()
    }

    render() {
        return (
            <Wrapper backgroundColor='white' additionalStyle={{ paddingTop: 90 }}>
                <div style={styles.mainDiv}>
                    <input onChange={this.onChangeSearchInput.bind(this)} style={styles.input} type='text' placeholder='Search your city...' />
                </div>
                <div style={styles.icon} onClick={this.onCloseClick.bind(this)}>
                    <IconContext.Provider value={{ color: '#777777', size: '25' }}>
                        <FiX />
                    </IconContext.Provider>
                </div>
            </Wrapper>

        )
    }
}

const styles = {
    mainDiv: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        width: '100%',
        border: 'none',
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        borderBottomColor: '#d8d8d8',
        color: '#757575',
        fontSize: '1rem',
        fontWeight: 100,
        outline: 'none',
        padding: 10
    },
    icon: {
        marginTop: 6,
        paddingRight: 15
    }
}

const mapStateToProps = ({ main }) => {
    const { searchResults } = main
    return { searchResults }
}

export default connect(mapStateToProps, { searchInputChanged, resetApp })(SearchInput);