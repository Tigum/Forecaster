
import LocationAndWeatherReducer from '../LocationAndWeatherReducer'
import {
    SEARCH_INPUT,
    LOAD_SEARCH_RESULTS,
    SELECT_LOCATION,
    SET_LAT_LONG,
    SET_FORECAST,
    SET_UNIT,
    LOADING,
    RESET_APP
} from '../../actions/types'

//UNIT TESTS that test the action types of the LocationAndWeatherReducer

it('handles actions of type SEARCH_INPUT', () => {
    const payload_content = 'New Location'
    const action = {
        type: SEARCH_INPUT,
        payload: payload_content
    }
    const newState = LocationAndWeatherReducer({ searchInput: '' }, action)
    expect(newState).toEqual({ searchInput: payload_content })
})


it('handles actions of type LOAD_SEARCH_RESULTS', () => {
    const payload_content = [
        {
            matching_alternate_names: [{}],
            matching_full_name: 'City, State, Country',
            _links: {}
        }
    ]
    const action = {
        type: LOAD_SEARCH_RESULTS,
        payload: payload_content
    }
    const newState = LocationAndWeatherReducer({ searchResults: [] }, action)
    expect(newState).toEqual({ searchResults: payload_content })
})


it('handles actions of type SELECT_LOCATION', () => {
    const payload_content = 'New York, New York, United States'
    const action = {
        type: SELECT_LOCATION,
        payload: payload_content
    }
    const newState = LocationAndWeatherReducer({ location: '' }, action)
    expect(newState).toEqual({ location: payload_content })
})


it('handles actions of type SET_LAT_LONG', () => {
    const payload_content = {
        latitude: 38.909,
        longitude: 48.918
    }
    const action = {
        type: SET_LAT_LONG,
        payload: payload_content
    }
    const newState = LocationAndWeatherReducer({ latitude: '', longitude: '' }, action)
    expect(newState).toEqual({ latitude: payload_content.latitude, longitude: payload_content.longitude })
})


it('handles actions of type SET_FORECAST', () => {
    const payload_content = [
        {
            date: '17/01/2019',
            dayForecast: [
                {
                    date: "17/01/2019",
                    dateAndTime: "2019-01-17 15:00:00",
                    date_ISOString: "2019-01-17T14:00:00.000Z",
                    description: "moderate rain",
                    hour: "15",
                    humidity: 96,
                    main: "Rain",
                    pressure: 967.62,
                    speed: 4.38,
                    temp: 280.95,
                    temp_max: 280.95,
                    temp_min: 280.903,
                }
            ]
        }
    ]
    const action = {
        type: SET_FORECAST,
        payload: payload_content
    }
    const newState = LocationAndWeatherReducer({ forecast: [] }, action)
    expect(newState).toEqual({ forecast: payload_content })
})


it('handles actions of type SET_UNIT', () => {
    const payload_content = 'kelvin'
    const action = {
        type: SET_UNIT,
        payload: payload_content
    }
    const newState = LocationAndWeatherReducer({ unit: 'celsius' }, action)
    expect(newState).toEqual({ unit: payload_content })
})


it('handles actions of type LOADING', () => {
    const payload_content = true
    const action = {
        type: LOADING,
        payload: payload_content
    }
    const newState = LocationAndWeatherReducer({ loading: false }, action)
    expect(newState).toEqual({ loading: payload_content })
})


it('handles actions of type RESET_APP', () => {

    const STATE = {
        searchInput: 'New York',
        searchResults: [
            {
                matching_alternate_names: [{}],
                matching_full_name: 'City, State, Country',
                _links: {}
            }
        ],
        location: 'New York, New York, United States',
        latitude: 38.903,
        longitude: 49.832,
        forecast: [
            {
                date: '17/01/2019',
                dayForecast: [
                    {
                        date: "17/01/2019",
                        dateAndTime: "2019-01-17 15:00:00",
                        date_ISOString: "2019-01-17T14:00:00.000Z",
                        description: "moderate rain",
                        hour: "15",
                        humidity: 96,
                        main: "Rain",
                        pressure: 967.62,
                        speed: 4.38,
                        temp: 280.95,
                        temp_max: 280.95,
                        temp_min: 280.903,
                    }
                ]
            }
        ],
        unit: 'kelvin',
        loading: true,
        localRecords: [
            {
                matching_full_name: 'Foligno',
                link: 'www.test.api.com'
            }
        ],
        error: 'Sorry no location selected. Try again'
    };

    const INITIAL_STATE = {
        searchInput: '',
        searchResults: [],
        location: '',
        latitude: '',
        longitude: '',
        forecast: [],
        unit: 'celsius',
        loading: false,
        localRecords: [],
        error: null
    };

    const action = {
        type: RESET_APP,
        payload: INITIAL_STATE
    }
    const newState = LocationAndWeatherReducer(STATE, action)
    expect(newState).toEqual(INITIAL_STATE)
})