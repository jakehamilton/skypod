import { h } from "preact";
import { useState } from "preact/hooks";
import { css } from "goober";
import { AppBar, Block, H2 } from "@jakehamilton/ui";
import Router from "preact-router";
import Home from "./Routes/Home";
import Error404 from "./Routes/Error404";
import Admin from "./Routes/Admin";

const AppClass = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

const AppContentClass = css``;

const App = () => {
    const [route, setRoute] = useState(window.location.pathname);

    const handleRouteChange = ({ url }) => {
        setRoute(url);
    };

    let title;

    if (route.startsWith("/admin")) {
        title = "Admin";
    } else {
        title = "SkyPod";
    }

    return (
        <Block color="background.light" className={AppClass}>
            <AppBar left={<H2>{title}</H2>} />
            <div className={AppContentClass}>
                <Router onChange={handleRouteChange}>
                    <Home path="/" />
                    <Admin path="/admin" />
                    <Error404 default />
                </Router>
            </div>
        </Block>
    );
};

export default App;
