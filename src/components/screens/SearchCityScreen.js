import React, { Component } from 'react'
import SearchInput from '../common/SearchInput'
import List from '../common/List'
import { connect } from 'react-redux'

class SearchCityScreen extends Component {
    render() {
        const { searchResults } = this.props
        return (
            <div>
                <SearchInput />
                <List data={searchResults} />
            </div>

        )
    }
}

const mapStateToProps = ({ main }) => {
    const { searchResults } = main
    return { searchResults }
}

export default connect(mapStateToProps, {})(SearchCityScreen);