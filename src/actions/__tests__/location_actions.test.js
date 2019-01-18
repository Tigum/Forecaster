import {
    searchInputChanged,
    clearSearchResults,
} from '../location_actions'
import { SEARCH_INPUT, LOAD_SEARCH_RESULTS } from '../types'

describe('searchInputChanged', () => {
    it('has the correct type', () => {
        const action = searchInputChanged();
        expect(action.type).toEqual(SEARCH_INPUT)
    })

    it('has the correct payload', () => {
        const action = searchInputChanged('New Location');
        expect(action.payload).toEqual('New Location')
    })
})

describe('clearSearchResults', () => {
    it('has the correct type', () => {
        const action = clearSearchResults();
        expect(action.type).toEqual(LOAD_SEARCH_RESULTS)
    })

    it('has the correct payload', () => {
        const action = clearSearchResults([]);
        expect(action.payload).toEqual([])
    })
})

