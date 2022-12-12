# Channel Nine Technical Test

## Requirements

Using the design below, create a “weather widget” editor that allows users to set up a widget.

> Editor

-   The widget editor must have a form to allow a user to create a new widget. This form must include the following fields:

1.  Title
1.  Unit: metric or imperial
1.  Show Wind: true or false

> Widget

-   The widget itself should be a piece of JavaScript that reads the end user’s current location using navigator. Geolocation, and retrieves the current weather conditions for that location using the Open Weather Map API.

The data the widget displays is determined by the settings in the editor.

![Alt text](/src/assets/exmple-page.png "Architecture overview ")

## Tech Stack

-   I initialized this project with [Vite](https://vitejs.dev/guide/)
-   This React project was written in TypeScript, you will find the configuration [HERE](./tsconfig.json)
-   Styling was done using the [styled-components](https://styled-components.com/) framework.
-   Live version of this project is hosted on AWS Amplify [HERE]()

## Setup

If you'd like to dive in the code, run these commands in GitBash / Terminal

> `git clone` → `npm install` → `npm run dev`

Vite will display which port to access on your localhost (e.g. http://localhost:5173/)

## Assumptions

-   I will need two main components, returned to the same level ("siblings")
-   One component (the "Editor") will write to the context, while the other component (the "widget") will consume state from the context
-   I will the Style-components framework
-   I will add the unit to the widget to make it clear "weather" the temperature is in `°C` or `°F`

## Challenges

### Redux Framework

-   Although I was familiar with the concept of Context in React, I had never used Redux prior to this project.
-   I dived right in the documentation and started by implementing a simple example of a Redux store in JS.
-   After getting familiar with concept of Store and reducers and getting to grasp with all the layers at play I started using this new "Context" for the Weather Widget.
-   I created the first Slicer in plain JS to make sure that it was working and that I was able to both write and read from the store before converting this part of the code to TS.
    -   By Taking small, iterative steps into this new frameworks I was able to fairly quickly be able to use it and build a fully functional front-end app.
    -   Going deeper into the documentation, I can appreciate the level of complexity that reducers can add to state handling through context v. the React Context API.

### Style-components

-   I had used the Styled-component framework in the past but very sporadically and this project has had required me to refresh my self with the ins and out of the syntax and patterns at play.

### React Testing Library

-   I had mostly used Enzyme and the @wojtekmaj/enzyme-adapter-react-17 package when it came to test React components. However, since the of React 18, this adapter is out of date and will no longer be updated.
-   The `React Testing Library` has been on my list of "to learn" for sometimes now and this was the perfect opportunity for me to get to practice, speccing, coding, debugging and writing tests for a set of stateful components.
    <!-- What was hard? -->
    <!--  -->

## Implementation Details

### React App

### Styling

-   Talk about modularization of Styled-components

### Service Functions

1. User location → returns latitude + longitude
1. Reverse geocoding → to get location name based on coordinates
1. Weather data → to get actual weather information based on coordinates

-   Navigator.geolocation API

    -   This API has a few limitations:
        -   it requires the user's permission to access their location information, and not all users will be willing to grant that permission.
        -   The accuracy of the location information provided by the geolocation API can vary depending on the device and the availability of GPS signals. This can make it difficult to rely on the geolocation information for more critical tasks than weather data retrieval.
    -   `enableHighAccuracy: true` → will slow down response time as well as increase power consumption. Should consider adding a device detection method allowing to switch this option ([Navigator.userAgent](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent)).
    -   `maximumAge: 0` → means that the device cannot use a cached position and must attempt to retrieve the real current position. If performance is a concern, this could be changed to allow for cached value to be retrieved and prevent too many API calls to be performed.

-   The OpenWeather API
    -   Had to handle three different API calls
    -   I decided to proceed in getting the coordinates' data inside the reverse geocoding API call and to expose the combined resources (location name + coordinates) to the WeatherWidget components, rather than keeping track of two different state variables. It seemed to be the easiest route to go down as the API returned the coordinates by default.

### Utility Functions

-   Converting Units

### React Component Testing

redux-mock-store

-   Priority Order:
    -   Main MVP features (ie. Title input, temperature unit choice, winds peed display)
    -   Conditional rendering (User location, weather icon, wind speed text)
    -   Utility functions (speed, temperature and degree/compass conversion)
