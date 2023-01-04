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
-   Live version of this project is hosted on AWS Amplify [HERE](https://main.d1uwny9o893bvz.amplifyapp.com/)

## Setup

If you'd like to dive in the code, run these commands in GitBash / Terminal

> `git clone` → `npm install` → `npm run dev`

Vite will display which port to access on your localhost (e.g. http://localhost:5173/)

## Assumptions

-   I will need two main components, returned to the same level ("siblings")
-   One component (the "Editor") will write to the context, while the other component (the "widget") will consume state from the context
-   I will add styling using the Styled-components framework
-   I will add the unit to the widget to make it clear "weather" the temperature is in `°C` or `°F`

## Challenges

### Redux Framework

-   Although I was familiar with the concept of Context in React, I had never used Redux prior to this project.
-   I dived right in the documentation and started by implementing a simple example of a Redux store in JS.
-   After getting familiar with concept of Store and reducers and getting to grasp with all the layers at play I started using this new "Context" for the Weather Widget.
-   I created the first Slicer in plain JS to make sure that it was working and that I was able to both write and read from the store before converting this part of the code to TS.
    -   By taking small, iterative steps into this new frameworks I was able to fairly quickly be able to use it and build a fully functional front-end app.
    -   Going deeper into the documentation, I can appreciate the level of complexity that reducers can add to state handling through "context" v. the React Context API.

### Style-components

-   I had used the Styled-component framework in the past but very sporadically and this project has had required me to refresh my self with the ins and out of the syntax and patterns at play.

### React Testing Library

-   I had mostly used Enzyme and the @wojtekmaj/enzyme-adapter-react-17 package when it came to test React components. However, since the release of React 18, this adapter is out of date and will no longer be updated.
-   The `React Testing Library` has been on my list of "to learn" for sometimes now and this was the perfect opportunity for me to get to practice, speccing, coding, debugging and writing tests for a set of stateful components.
-

## Implementation Details

### Vite Template Build

`npm create vite@latest my-react-app -- --template react-ts`

Vite is a modern JavaScript development tool that can be used to initialize a React app. I decided to use it over `create-react-app` for a few reasons:

-   It offers faster build times and smaller bundle sizes.
-   It uses native ES module imports.
-   Furthermore, it comes with built-in support for TypeScript, so I didn't have to spend time configuring the TypeScript compiler and other dependencies, make my development process more efficient.

[Learn More about Vite](https://vitejs.dev/guide/why.html)

### React Components

-   I initially decided to only created two components `<WeatherEditor>` & `<WeatherWidget>`, however I came to realize that this would make both these components very much stateful and relying on the Redux Store, thus making neither reusable nor easily testable.
-   I then decided to extract all state and Redux logic out of these two components and abstract it in a higher order component (i.e. container), named `<WeatherPage>`.
-   That container handles all the necessary logic, from Redux Read & Write dispatch methods, to API calls and is then handling passing down the appropriate data to the two "dumb" components.
-   By doing so I actually ended up reducing the amount of code linked to access Redux Store variables (not having to access these in both `<WeatherEditor>` and `<WeatherWidget>`) but I have also made these components more easily testable as I will not have to mock a Redux Store when trying to test them.

### Styling

-   Talk about modularization of Styled-components

### Service Functions

-   Had to handle three different API calls

1. User location → returns latitude + longitude
1. Reverse geocoding → to get location name based on coordinates
1. Weather data → to get actual weather information based on coordinates

-   Navigator.geolocation API

    -   This API has a few limitations:
        -   it requires the user's permission to access their location information, and not all users will be willing to grant that permission.
        -   The accuracy of the location information provided by the geolocation API can vary depending on the device and the availability of GPS signals. This can make it difficult to rely on the geolocation information for more critical tasks than weather data retrieval.
    -   `enableHighAccuracy: true` → will slow down response time as well as increase power consumption. Should consider adding a device detection method allowing to switch this option ([Navigator.userAgent](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent)).
    -   `maximumAge: 0` → means that the device cannot use a cached position and must attempt to retrieve the real current position. If performance is a concern, this could be changed to allow for cached value to be retrieved and prevent too many API calls to be performed.

-   ## The OpenWeather API
    -   I decided to proceed in getting the coordinates' data inside the reverse geocoding API call and to expose the combined resources (location name + coordinates) to the `<WeatherPage />` container, rather than keeping track of two different state variables. It seemed to be the easiest route to go down as the API returned the coordinates alongside the name of the location as its default response.
    -   As the location of the user is automatically detected and the API call retrieving the local temperature called by default for metric values, I decided to proceed in converting that value locally rather than spending more processing resources on server requests. Two small helper functions proceed in converting from metric to imperial or the other way around when the user select the relevant radio input.
    -   <!-- -   Storing API KEY in .env file in Vite project -->

### Utility Functions

-   tempUtils and windUtils contains simple conversion function for both temperature and wind speed and direction units. These function essentially do simple math operation to get useful data for our front end.

### React Component Testing

> -   Vitest (setup)

Share configuration with Vite (ensures the testing environment is similar to the build environment).
Vitest’s approach to the testing space: let the tool control your entire environment, top to bottom.
Vitest supports HMR (Hot Module Reloading), which speeds up your workflow. With HMR, only the changes are updated on the server, and the server reflects the new changes.
Jest Snapshot support.

Vitest is a replacement for a suite of tools:

-   Jest, Mocha, or Chai for test utilities
-   Babel for transpiling ESM, TypeScript, and more
-   webpack or Rollup for bundling test dependencies (if needed)

How does Vitest compare to Jest?

Only one config needed: with Vitest, configuration for dev, build and test environment as a single pipeline, sharing the same plugins and the same [configuration file](./vite.config.ts)

> -   jest-dom

The jest-dom package is a set of custom jest matchers that make it easier to test the behavior of React components. It provides a variety of utility functions and matchers that can be used to assert the state and behavior of DOM elements, such as whether a particular element is present in the DOM, whether it has the expected text content or attributes, and whether it has been correctly updated in response to user interactions.

This can be especially useful when writing unit tests for React components, as it allows you to test the component's output in a way that is more user-friendly and intuitive than checking the raw HTML output.

> -   react-testing-library

The React Testing Library is a library for testing React components. It is designed to test the behavior of the components as a user would interact with them, rather than just testing the internal logic of the components.

Some reasons why I chose the RTL:

-   It encourages the use of good testing practices, such as testing the component in isolation and avoiding testing implementation details.
-   It helps to ensure that the tests accurately reflect how the component will be used in a real application.
-   It makes it easier to write tests that are resilient to changes in the implementation of the component.
-   It is lightweight and easy to use.
-   It is widely used and has a strong community of developers contributing to it.

What behavior I tested:

-   For the `WeatherEditor`:

    -   Does the Title Input handler function get called each time the user adds or remove a character from the input element?
    -   Is the Title Input reset when the user deletes the current string in the input element?
    -   Does the component register a change of state related to the temperature unit when the user click on the radio button?
    -   Does the component register a change of state related to the wind display when the user click on the radio button?

-   For the `WeatherWidget`:
    -   Does the component render all its props correctly?
    -   Is the wind displayed the related prop is set to `true`?
    -   Does the component display accurate data when an update occurs?

https://testing-library.com/docs/guiding-principles/

> -   redux-mock-store

<!-- TBE -->

## Next Steps

-   Fix max length of Widget Title Length
-   Check if possible to get higher resolution weather icon

### Adding to the components' library

### Environment Variables in Vite Project
