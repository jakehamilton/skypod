const { Middleware } = require("@leverage/core");
const cors = require("cors");

const log = require("../util/log");

class CorsMiddleware extends Middleware {
    type = "http";

    http({ app }) {
        log.trace(
            `Using CORS origin "${process.env.CORS_ORIGIN || "undefined"}".`
        );

        app.use(
            cors({
                origin: process.env.CORS_ORIGIN || undefined,
                optionsSuccessStatus: 200,
            })
        );
    }
}

module.exports = CorsMiddleware;
