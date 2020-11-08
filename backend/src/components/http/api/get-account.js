const { Component } = require("@leverage/core");

class HTTPComponent extends Component {
    is = "component";
    type = "http";
    config = {
        http: {
            path: "/api/account",
            method: "get",
        },
    };

    http(req, res) {
        if (req.isAuthenticated()) {
            res.json({
                account: {
                    email: "a",
                },
            });
        } else {
            res.status(401);
            res.json({
                message: "Not authenticated.",
            });
        }
    }
}

module.exports = HTTPComponent;
