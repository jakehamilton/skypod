import { render, h } from "preact";
import { util, ThemeProvider } from "@jakehamilton/ui";

import App from "./App";
import { glob } from "goober";

util.theme.injectGlobalStyles();

glob`
    #app {
        width: 100%;
        height: 100%;
    }
`;

render(
    <ThemeProvider>
        <App />
    </ThemeProvider>,
    document.getElementById("app")
);
