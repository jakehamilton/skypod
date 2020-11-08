import { render, h } from "preact";
import { util, ThemeProvider } from "@jakehamilton/ui";

import App from "./App";
import { glob } from "goober";
import AuthProvider from "./components/AuthProvider";

util.theme.injectGlobalStyles();

glob`
    #app {
        width: 100%;
        height: 100%;
    }
`;

render(
    <AuthProvider>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </AuthProvider>,
    document.getElementById("app")
);
