const path = require("path");
const { Middleware } = require("@leverage/core");
const es6Renderer = require("express-es6-template-engine");

class ViewMiddleware extends Middleware {
    type = "http";

    http({ app }) {
        app.engine("html", es6Renderer);
        app.set("view engine", "html");

        app.set("views", path.resolve(__dirname, "..", "views"));
    }
}

module.exports = ViewMiddleware;
