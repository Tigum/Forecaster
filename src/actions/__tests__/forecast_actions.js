import { 
    setUnit,
    resetApp
} from '../forecast_actions'
import { SET_UNIT, RESET_APP } from '../types'

describe('setUnit', () => {
    it('has the correct type', () => {
        const action = setUnit();
        expect(action.type).toEqual(SET_UNIT)
    })

    it('has the correct payload', () => {
        const action = setUnit('kelvin');
        expect(action.payload).toEqual('kelvin')
    })
})


describe('resetApp', () => {
    it('has the correct type', () => {
        const action = resetApp();
        expect(action.type).toEqual(RESET_APP)
    })
})
