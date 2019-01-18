This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`
**Please make sure to run `npm install` before running `npm start`. That will make sure all dependencies are installed.**

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

**After running `npm test` press `a` to run all tests**

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.


## App Details

### Front End and APIs

This application was developed in ReactJS with Redux. The entire application is based on Redux Store, what makes the application light and efficient. 

Two different APIs were used:<br>
1-) Teleport Public API (https://developers.teleport.org/api/getting_started/), which was used to display the names of all possible locations in the world, get their name, and coordinates<br>
2-) OpenWeatherMap 5 day Forecast API, which was used to fetch data about the current weather of the day, and also the forecast for the next 5 days

The application shows details about temperature, humidity, wind speed, hour by hour forecast, and also provides different degree units to be displayed ( Celsius, Kelvin, and Fahrenheit ). 
The entire application is responsive.

### Home Screen

The Home Screen was created with the intention of getting from the user the location desired. Once this location is defined, either by getting the user's current location or by the user manually searching for a specific location in the World, the application can provide the current weather and 5 day forecast.

### Search location Screen

In the Search location Screen you can search any location in the World and discover its weather and 5 day forecast. <br>
In addition, the application keeps a record of the latest 20 searches performed by the user and displays it in the Search location Screen when nothing is being searched.

### Forecast Screen

The Forecast Screen displays cards with the current weather (temperature, humidity, and wind speed), and the forecast for the next 5 days. Also it displays an hour by hour forecast informing the expected temperature for a given hour of the day.<br>
In addition, you can select the degree unit you desire ( Celsius, Kelvin, or Fahrenheit )

### Future improvements

Regarding future improvements, it would be interesting to add user authentication so the user experience could be improved. Also, the following could be implemented:<br>
1-) Animations to improve user experience<br>
2-) Maps to provide a more interactive experience to the client<br>
3-) Latest news about the weather, either on the user's location or in the user's favorite places<br>
4-) Adding weather information about airports and beaches would be useful as well<br>
5-) Once the application has a reasonable amount of users, add advertisement<br>
6-) Implement more complex tests to guarantee the good functionality of the application
