import { ThemeProvider } from "styled-components";
import { theme } from "./components/styles/Theme";
import GlobalStyles from "./components/styles/Global.styles";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import store from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    // <React.StrictMode>
    <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Provider store={store}>
            <App />
        </Provider>
    </ThemeProvider>,
    // </React.StrictMode>,
);
