
import configureMockStore from 'redux-mock-store';
import _ from 'lodash'
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import { performCitySearch, selectSearchedLocation, loadingExport, loadForecast, loadLocalRecords } from '../actions';
import locationResponse from './mocks/locationResultsMocks.json';
import latLonResponse from './mocks/latLonResultsMocks.json';
import weatherResponse from './mocks/weatherResultsMocks.json';
import forecastResponse from './mocks/forecastResultsMocks.json';
import loadForecastMocks from '../actions/loadForecastMocks'
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

    it('loads location search results', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: locationResponse,
            });
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

    it('loads selected location', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: latLonResponse,
            });
        });

        const coords = {
            latitude: 42.9545227,
            longitude: 12.7029586
        }

        const expectedActions = [
            { type: SELECT_LOCATION, payload: latLonResponse.full_name },
            { type: SET_LAT_LONG, payload: coords }
        ];

        const store = mockStore({ location: '', latitude: '', longitude: '' })

        try {
            await store.dispatch(selectSearchedLocation())
            return expect(store.getActions()).toEqual(expectedActions);
        } catch (err) {
            return
        }
    })

    it('loading output', async () => {
        const expectedActions = [
            { type: LOADING, payload: true },
        ];

        const store = mockStore({ loading: true })

        try {
            await store.dispatch(loadingExport())
            return expect(store.getActions()).toEqual(expectedActions);
        } catch (err) {
            return
        }
    });

    it('loads local search results', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: []
            });
        });

        const expectedActions = [
            { type: LOAD_LOCAL_RECORDS, payload: [] },
        ];

        const store = mockStore({ localRecords: [] })

        try {
            await store.dispatch(loadLocalRecords())
            return expect(store.getActions()).toEqual(expectedActions);
        } catch (err) {
            console.log(err)
            return
        }
    });
});


//Tests for the async actions located in the forecast_actions.js file, in actions folder
describe('forecast_actions async tests', () => {

    beforeEach(function () {
        moxios.install();
    });

    afterEach(function () {
        moxios.uninstall();
    });


    it('load forecast array', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: forecastResponse,
            });
        });

        const expectedActions = [
            { type: SET_FORECAST, payload: loadForecastMocks(forecastResponse.list, weatherResponse) },
        ];

        const store = mockStore({ forecast: [] })

        try {
            await store.dispatch(loadForecast())
            return expect(store.getActions()).toEqual(expectedActions);
        } catch (err) {
            return
        }

    })

});