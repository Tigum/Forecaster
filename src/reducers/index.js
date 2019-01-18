import { combineReducers } from 'redux';
import LocationAndWeatherReducer from './LocationAndWeatherReducer'

export default combineReducers({
    main: LocationAndWeatherReducer
})