import React from 'react'
import { Provider } from 'react-redux'
import store from '../store';

//Root component that wrappes its children into the react redux Provider to load its store
const Root = props => {
    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    )
}

export default Root