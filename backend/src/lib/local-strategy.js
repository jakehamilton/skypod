const { Strategy } = require("passport-local");
const User = require("../models/user");

const localStrategy = new Strategy(
    {
        usernameField: "email",
        passwordField: "password",
    },
    (email, password, done) => {
        process.nextTick(async () => {
            const user = await User.getByEmailAndPassword(email, password);
            if (!user) {
                return done(null, false, { message: "Invalid Credentials" });
            } else {
                return done(null, user);
            }
        });
    }
);

module.exports = localStrategy;
