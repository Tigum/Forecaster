import {
    SEARCH_INPUT,
    LOAD_SEARCH_RESULTS,
    SELECT_LOCATION,
    SET_LAT_LONG,
    SET_FORECAST,
    SET_UNIT,
    RESET_APP,
    LOADING,
    LOAD_LOCAL_RECORDS,
    ERROR
} from '../actions/types'

//Apps initial state
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

//All the possible redux actions
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SEARCH_INPUT:
            return { ...state, searchInput: action.payload }
        case LOAD_SEARCH_RESULTS:
            return { ...state, searchResults: action.payload }
        case SELECT_LOCATION:
            return { ...state, location: action.payload }
        case SET_LAT_LONG:
            return { ...state, latitude: action.payload.latitude, longitude: action.payload.longitude }
        case SET_FORECAST:
            return { ...state, forecast: action.payload }
        case SET_UNIT:
            return { ...state, unit: action.payload }
        case LOADING:
            return { ...state, loading: action.payload }
        case LOAD_LOCAL_RECORDS:
            return { ...state, localRecords: action.payload }
        case ERROR:
            return { ...state, error: action.payload }
        case RESET_APP:
            return { ...state, ...INITIAL_STATE }
        default:
            return state
    }
}

