const fs = require("fs");
const path = require("path");
const { Manager } = require("@leverage/core");
const { HTTP } = require("@leverage/plugin-http");
const mongoose = require("mongoose");

const log = require("./util/log");
const requireAll = require("./util/require-all");

const main = async () => {
    const PORT = process.env.NODE_PORT ? Number(process.env.NODE_PORT) : 3001;

    const http = new HTTP();

    const manager = new Manager();

    manager.add(http);

    const services = requireAll(path.resolve(__dirname, "services"));

    manager.add(...services);

    const middleware = requireAll(path.resolve(__dirname, "middleware"));

    manager.add(...middleware);

    const components = requireAll(path.resolve(__dirname, "components"));

    manager.add(...components);

    // Add fallback for html5 history
    const HttpIndex = require("./components/http/get-index");
    const httpIndex = new HttpIndex();
    httpIndex.config.http.path = "*";

    manager.add(httpIndex);

    log.info(`HTTP server listening on port "${PORT}".`);
    http.listen(PORT);

    const cleanup = () => {
        log.info("Closing HTTP server...");

        http.server.close((error) => {
            if (error) {
                log.error("Error closing HTTP server:");
                console.error(error);
                process.exit(1);
            }

            process.exit(0);
        });

        setTimeout(() => {
            log.error("Could not close server gracefully.");
            log.error("Killing process.");
            process.exit(1);
        }, 3000);
    };

    process.on("SIGINT", cleanup);
};

main().catch((error) => {
    log.error(error.message || error);

    for (const line of error.stack.split("\n").slice(1)) {
        log.error(line);
    }
});
