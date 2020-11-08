const { Component } = require("@leverage/core");

class HTTPComponent extends Component {
    is = "component";
    type = "http";
    config = {
        http: {
            path: "/api",
            method: "get",
        },
    };

    http(req, res) {
        res.end("Hello");
    }
}

module.exports = HTTPComponent;
