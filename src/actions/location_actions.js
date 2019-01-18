import { SEARCH_INPUT, LOAD_SEARCH_RESULTS, SET_LAT_LONG, SELECT_LOCATION, LOADING, LOAD_LOCAL_RECORDS, ERROR } from './types'
import history from '../components/history'
import _ from 'lodash'
import axios from 'axios'

// Action that dispatches what is being written in the search bar when looking for a location
export const searchInputChanged = (input) => {
    return {
        type: SEARCH_INPUT,
        payload: input
    }
}

// Action to clear search results
export const clearSearchResults = () => {
    return {
        type: LOAD_SEARCH_RESULTS,
        payload: []
    }
}

//Function that performs location search using Teleport API, and dispatch results
export const performCitySearch = (input) => async (dispatch) => {
    try {
        const response = await axios.get(`https://api.teleport.org/api/cities/?search=${input}`)
        const results = _.values(response.data._embedded)[0]
        dispatch({
            type: LOAD_SEARCH_RESULTS,
            payload: results
        })
    } catch (err) {
        console.log(err)
        return
    }
}

//Function to get client's current latitude and longitude and dispatch the location name, and coordinates
export const getCityByLatLong = (latitude, longitude) => async (dispatch) => {

    try {
        loading(dispatch, true)
        const response = await axios.get(`https://api.teleport.org/api/locations/${latitude}%2C%20${longitude}/`)
        const nearCityRes = _.values(response.data._embedded)[0]
        const cityLink = _.values(nearCityRes[0]._links)[0].href

        if (cityLink) {
            try {
                const response2 = await axios.get(cityLink)
                const location = response2.data.full_name
                dispatch({
                    type: SELECT_LOCATION,
                    payload: location
                })
                const coords = {
                    latitude,
                    longitude
                }
                dispatch({
                    type: SET_LAT_LONG,
                    payload: coords
                })
                history.push('/forecast')
                return
            } catch (err) {
                loading(dispatch, false)
                history.push('/')
                console.log(err)
                return
            }
        }

    } catch (err) {
        loading(dispatch, false)
        history.push('/')
        console.log(err)
        return
    }
}

//Function that selects the chosen location, fetches the exact location data, and dispatches location name and coords
//Also it stores locally the latest searches (max of 20 records) that are displayed in the location search list
export const selectSearchedLocation = (info) => async (dispatch) => {
    loading(dispatch, true)
    const locationLink = info._links ? _.values(info._links)[0].href : info.link
    if (locationLink) {
        try {
            const response = await axios.get(locationLink)
            const location = response.data.full_name
            const coords = response.data.location.latlon
            dispatch({
                type: SELECT_LOCATION,
                payload: location
            })
            dispatch({
                type: SET_LAT_LONG,
                payload: coords
            })
            history.push('/forecast')

            dispatch({
                type: LOAD_SEARCH_RESULTS,
                payload: []
            })

            try {
                let records = await JSON.parse(localStorage.getItem('forecaster_records'))
                if (records && records.length === 0) {
                    let newArray = []
                    const obj = {
                        matching_full_name: location,
                        link: locationLink
                    }
                    newArray.push(obj)
                    try {
                        await localStorage.setItem('forecaster_records', JSON.stringify(newArray))
                    } catch (err) {
                        console.log(err)
                        return
                    }
                }

                if (records && records.length < 20) {
                    let newArray = []
                    const obj = {
                        matching_full_name: location,
                        link: locationLink
                    }

                    records.forEach((item) => {
                        if (item.matching_full_name !== location) {
                            newArray.push(item)
                        }
                    })

                    newArray.unshift(obj)
                    try {
                        await localStorage.setItem('forecaster_records', JSON.stringify(newArray))
                    } catch (err) {
                        console.log(err)
                        return
                    }
                }

                if (records && records.length >= 20) {
                    let newArray = []
                    const obj = {
                        matching_full_name: location,
                        link: locationLink
                    }

                    records.forEach((item) => {
                        if (item.matching_full_name !== location) {
                            newArray.push(item)
                        }
                    })

                    if (newArray.length >= 20) {
                        newArray.pop()
                        newArray.unshift(obj)
                    } else {
                        newArray.unshift(obj)
                    }


                    try {
                        await localStorage.setItem('forecaster_records', JSON.stringify(newArray))
                    } catch (err) {
                        console.log(err)
                        return
                    }
                }

                if (!records) {
                    let newArray = []
                    const obj = {
                        matching_full_name: location,
                        link: locationLink
                    }
                    newArray.push(obj)
                    try {
                        await localStorage.setItem('forecaster_records', JSON.stringify(newArray))
                    } catch (err) {
                        console.log(err)
                        return
                    }
                }


            } catch (err) {
                loading(dispatch, false)
                console.log(err)
                return
            }

        } catch (err) {
            loading(dispatch, false)
            error(dispatch, 'Sorry! Location not found. Please try again')
            return
        }

    } else {
        loading(dispatch, false)
        return error(dispatch, 'Sorry! Location not found. Please try again')
    }
}

//Function that dispatches the latest searches performed by the client
export const loadLocalRecords = () => async (dispatch) => {
    try {
        const records = await JSON.parse(localStorage.getItem('forecaster_records'))
        const response = records || []
        dispatch({
            type: LOAD_LOCAL_RECORDS,
            payload: response
        })
    } catch (err) {
        console.log(err)
        return
    }
}

//Function that sets the loading prop to true or false
const loading = (dispatch, input) => {
    dispatch({
        type: LOADING,
        payload: input
    })
}

//Action that sets the loading prop to true or false
export const loadingExport = (input) => {
    return {
        type: LOADING,
        payload: input
    }
}

//Action that clears all errors
export const clearErrors = () => {
    return {
        type: ERROR,
        payload: null
    }
}

//Function that dispatches an error
const error = (dispatch, text) => {
    dispatch({
        type: LOADING,
        payload: text
    })
}
