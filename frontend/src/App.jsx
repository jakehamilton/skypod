import { h } from "preact";
import { css } from "goober";
import { AppBar, Block } from "@jakehamilton/ui";
import Router from "preact-router";
import Home from "./Routes/Home";
import Error404 from "./Routes/Error404";

const AppClass = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

const AppContentClass = css``;

const App = () => {
    return (
        <Block color="background.light" className={AppClass}>
            <AppBar />
            <div className={AppContentClass}>
                <Router>
                    <Home path="/" />
                    <Error404 default />
                </Router>
            </div>
        </Block>
    );
};

export default App;
