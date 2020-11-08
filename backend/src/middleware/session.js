const { Middleware } = require("@leverage/core");
const session = require("express-session");
const connectMongo = require("connect-mongo");
const mongoose = require("mongoose");

class SessionMiddleware extends Middleware {
    type = "http";

    http({ app }) {
        const Store = connectMongo(session);

        app.use(
            session({
                secret: process.env.SESSION_SECRET || "secret",
                resave: true,
                saveUninitialized: true,
                store: new Store({
                    mongooseConnection: mongoose.connection,
                }),
            })
        );
    }
}

module.exports = SessionMiddleware;
