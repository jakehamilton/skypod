const { Middleware } = require("@leverage/core");
const passport = require("passport");

const User = require("../models/user");
const localStrategy = require("../lib/local-strategy");

const log = require("../util/log");

class AuthMiddleware extends Middleware {
    type = "http";

    http({ app }) {
        passport.use(localStrategy);

        passport.serializeUser((user, done) => {
            done(null, user._id);
        });

        passport.deserializeUser((id, done) => {
            User.findById(id, done);
        });

        app.use(passport.initialize());
        app.use(passport.session());
    }
}

module.exports = AuthMiddleware;
