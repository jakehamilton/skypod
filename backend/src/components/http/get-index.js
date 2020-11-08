const fs = require("fs");
const path = require("path");
const { Component } = require("@leverage/core");

const manifest =
    process.env.NODE_ENV === "production"
        ? fs.readFileSync(
              path.resolve(__dirname, "../..", "public", "manifest.json")
          )
        : {};

class HTTPComponent extends Component {
    type = "http";

    config = {
        http: {
            path: "/",
            method: "get",
        },
    };

    http(req, res) {
        res.render("index", {
            locals: {
                env: process.env.NODE_ENV || "development",
                manifest,
            },
        });
    }
}

module.exports = HTTPComponent;
