
import configureMockStore from 'redux-mock-store';
import _ from 'lodash'
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import { performCitySearch, selectSearchedLocation, loadForecast, loadLocalRecords, getCityByLatLong } from '../actions';
import locationResponse from './mocks/locationResultsMocks.json';
import latLonResponse from './mocks/latLonResultsMocks.json';
import weatherResponse from './mocks/weatherResultsMocks.json';
import forecastResponse from './mocks/forecastResultsMocks.json';
import completeForecastResponse from './mocks/completeForecastResponse'
import getCityByLatLonMocks from './mocks/getCityByLatLonMocks.json'
import { LOAD_SEARCH_RESULTS, SET_LAT_LONG, SELECT_LOCATION, LOADING, SET_FORECAST, LOAD_LOCAL_RECORDS } from '../actions/types'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

//Tests for the async actions located in the location_actions.js file, in actions folder
describe('location_actions async tests', () => {

    beforeEach(function () {
        moxios.install();
    });

    afterEach(function () {
        moxios.uninstall();
    });

    it('loads location search results', async (done) => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: locationResponse,
            });
            done()
        });

        const expectedActions = [
            { type: LOAD_SEARCH_RESULTS, payload: _.values(locationResponse._embedded)[0] },
        ];

        const store = mockStore({ searchResults: [] })

        try {
            await store.dispatch(performCitySearch())
            return expect(store.getActions()).toEqual(expectedActions);
        } catch (err) {
            console.log(err)
            return
        }
    });

    it('loads searched selected location', async (done) => {
        const coords = {
            latitude: 42.95488,
            longitude: 12.70268
        }
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: latLonResponse,
            })
            done()
        });

        const expectedActions = [
            { type: LOADING, payload: true },
            { type: SELECT_LOCATION, payload: latLonResponse.full_name },
            { type: SET_LAT_LONG, payload: coords },
            { type: LOAD_SEARCH_RESULTS, payload: [] }
        ];

        const store = mockStore({ location: '', latitude: '', longitude: '', loading: false, searchResults: [] })

        const info = {
            link: `https://api.teleport.org/api/locations/${coords.latitude}%2C%20${coords.longitude}/`
        }

        try {
            await store.dispatch(selectSearchedLocation(info))
            return expect(store.getActions()).toEqual(expectedActions);
        } catch (err) {
            console.log(err)
            return
        }
    })


    it('loads local search results', async () => {
        try {
            const records = await JSON.parse(localStorage.getItem('forecaster_records'))
            const response = records || []
            const expectedActions = [
                {
                    type: LOAD_LOCAL_RECORDS, payload: response
                },
            ];
            const store = mockStore({ localRecords: [] })
            try {
                await store.dispatch(loadLocalRecords())
                return expect(store.getActions()).toEqual(expectedActions);
            } catch (err) {
                console.log(err)
                return
            }

        } catch (err) {
            console.log(err)
            return
        }
    });


    it('loads current location', async (done) => {
        const coords = {
            latitude: 42.95488,
            longitude: 12.70268
        }

        const response = {
            full_name: 'Foligno, Umbria, Italy'
        }

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: getCityByLatLonMocks,
            })
                .then((res) => {
                    moxios.wait(() => {
                        const request = moxios.requests.mostRecent();
                        request.respondWith({
                            status: 200,
                            response: response,
                        })
                        done()
                    });
                })
        });

        const expectedActions = [
            { type: SELECT_LOCATION, payload: 'Foligno, Umbria, Italy' },
            { type: SET_LAT_LONG, payload: coords },
        ];

        const store = mockStore({ location: '', latitude: '', longitude: '' })

        try {
            await store.dispatch(getCityByLatLong(coords.latitude, coords.longitude))
            return expect(store.getActions()).toEqual(expectedActions);
        } catch (err) {
            console.log(err)
            return
        }
    })
});


//Tests for the async actions located in the forecast_actions.js file, in actions folder
describe('forecast_actions async tests', () => {

    beforeEach(function () {
        moxios.install();
    });

    afterEach(function () {
        moxios.uninstall();
    });


    it('load forecast array', async (done) => {
        const coords = {
            lat: 42.944,
            lon: 12.7011
        }
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: forecastResponse,
            })
            .then(() => {
                moxios.wait(() => {
                    const request = moxios.requests.mostRecent();
                    request.respondWith({
                        status: 200,
                        response: weatherResponse,
                    })
                    done()
                });
            })
        });


        const expectedActions = [
            { type: SET_FORECAST, payload: completeForecastResponse },
            { type: LOADING, payload: false }
        ];

        const store = mockStore({ forecast: [] })

        try {
            await store.dispatch(loadForecast(coords.lat, coords.lon))
            return expect(store.getActions()).toEqual(expectedActions);
        } catch (err) {
            console.log(err)
            return
        }   

    });
});

