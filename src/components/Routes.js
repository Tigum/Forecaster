import React from 'react'
import { Switch, Route } from 'react-router-dom'
import WelcomeScreen from './screens/WelcomeScreen'
import SearchCityScreen from './screens/SearchCityScreen'
import ForecastScreen from './screens/ForecastScreen'

//App routes
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={WelcomeScreen} />
      <Route exact path='/searchCity' component={SearchCityScreen} />
      <Route exact path='/forecast' component={ForecastScreen} />
    </Switch>
  </main>
)

export default Main