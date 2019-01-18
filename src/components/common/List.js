import React, { Component } from 'react';
import ListItem from './ListItem'
import Wrapper from './Wrapper'
import { connect } from 'react-redux'
import { performCitySearch, clearSearchResults, loadLocalRecords } from '../../actions/location_actions'

class List extends Component {

    state = {
        loadRecords: true
    }

    //Loads the latest location search results
    componentWillMount() {
        if (this.state.loadRecords) {
            this.props.loadLocalRecords()
        }
    }

    //Prevents the loadLocalRecords function to keep reloading
    componentDidMount() {
        this.setState({ loadRecords: false })
    }

    //Based on the change of the prop searchInput value, this function determines
    // what is to be shown to the user. That is either the search results or the latest search results stores locally
    componentWillReceiveProps(nextProps) {
        if (this.props.searchInput !== nextProps.searchInput) {
            if (nextProps.searchInput.length === 0) {
                this.props.loadLocalRecords()
                this.props.clearSearchResults()
            } else {
                this.props.performCitySearch(nextProps.searchInput)
            }
        }
    }

    //Helper function that loads either the list of the latest search results store locally
    // or the current search results that the user is searching
    loadItems() {
        const { data, localRecords } = this.props
        let local = localRecords || []
        if (data.length === 0) {
            return local.map((item, i) => {
                return (
                    <ListItem
                        key={i}
                        item={item}
                        additionalStyle={{ textAlign: 'center' }}
                        textColor={{ color: '#adadad' }}
                    />
                )
            })
        }
        return data.map((item, i) => {
            return (
                <ListItem
                    key={i}
                    item={item}
                />
            )
        })
    }

    render() {
        const { data } = this.props
        return (
            <Wrapper backgroundColor='white' horizontalAlign={data.length === 0 ? 'center' : 'flex-start'}>
                <div style={styles.list}>
                    {this.loadItems()}
                </div>
            </Wrapper>
        )
    }
}

const styles = {
    list: {
        display: 'flex',
        flexDirection: 'column',
    },
    mainDiv: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        width: '100%'
    }
}

const mapStateToProps = ({ main }) => {
    const { searchInput, searchResults, localRecords } = main
    return { searchInput, searchResults, localRecords }
}

export default connect(mapStateToProps, { performCitySearch, clearSearchResults, loadLocalRecords })(List);