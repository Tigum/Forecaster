import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

//Creating redux store with Redux Thunk middleware to assist with async actions
const store = createStore(
    reducers,
    {},
    compose(
        applyMiddleware(thunk)
    )
)

export default store;