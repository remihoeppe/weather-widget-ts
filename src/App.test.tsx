import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { theme } from "./components/styles/Theme";
import GlobalStyles from "./components/styles/Global.styles";
import App from "./App";
import store from "./redux/store";
import configureStore from "redux-mock-store";
import { changeTemp } from "./redux/tempChange";

describe("App renders Created by text", () => {
    const initialState = {
        widgetTitle: "Widget Title",
        temp: "C",
        isWindDisplayed: true,
    };

    const mockStore = configureStore();
    const appStore = mockStore(initialState);

    render(
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Provider store={appStore}>
                <App />
            </Provider>
        </ThemeProvider>,
    );
    const createdBy = screen.getByText(/Create by/i);
    expect(createdBy).toBeInTheDocument();
});
