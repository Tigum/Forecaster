import React, { Component } from 'react'
import Wrapper from '../common/Wrapper'
import { connect } from 'react-redux'
import { loadForecast } from '../../actions/forecast_actions'
import ForecastList from '../common/ForecastList'
import Loader from '../common/Loader'

class ForecastScreen extends Component {

    //Once component is mounted, it loads the forecast based on latitude and longitude of the selected place
    componentDidMount() {
        const { latitude, longitude } = this.props
        this.props.loadForecast(latitude, longitude)
    }

    render() {
        const { forecast, loading } = this.props
        if (loading) {
            return (
                <div style={{ paddingTop: 150 }}>
                    <Loader size={10} />
                </div>

            )
        }
        return (
            <Wrapper backgroundColor='white' additionalStyle={{ paddingTop: 70 }}>
                <ForecastList data={forecast} />
            </Wrapper>
        )
    }
}

const mapStateToProps = ({ main }) => {
    const { location, latitude, longitude, forecast, loading } = main
    return { location, latitude, longitude, forecast, loading }
}

export default connect(mapStateToProps, { loadForecast })(ForecastScreen);