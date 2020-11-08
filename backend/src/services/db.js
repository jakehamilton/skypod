const mongoose = require("mongoose");
const { Service } = require("@leverage/core");
const littlelog = require("@littlethings/log");

const log = littlelog.create("MongoDB");

class DB extends Service {
    name = "db";

    constructor() {
        super();

        this.connect({
            host: process.env.DB_HOST || "mongodb",
            port: process.env.DB_PORT || undefined,
            database: process.env.DB_NAME || "skypod",
            username: process.env.DB_USER || undefined,
            password: process.env.DB_PASSWORD || undefined,
            authDatabase: process.env.DB_AUTH_DB_NAME || undefined,
        });
    }

    connect(
        {
            host = "mongodb",
            port = 27017,
            database = "skypod",
            username = "skypod",
            password,
            authDatabase,
        },
        i = 0
    ) {
        return new Promise((resolve, reject) => {
            log.info(`Connecting to database "mongodb://${host}:${port}".`);
            mongoose.connect(
                `mongodb://${host}:${port}`,
                {
                    useUnifiedTopology: true,
                    useNewUrlParser: true,
                    logger: log,
                    dbName: database,
                    user: username,
                    pass: password,
                    authSource: authDatabase,
                },
                (error) => {
                    if (error) {
                        log.error(error);

                        setTimeout(() => {
                            resolve(
                                this.connect(
                                    {
                                        host,
                                        port,
                                        database,
                                        username,
                                        password,
                                        authDatabase,
                                    },
                                    i + 1
                                )
                            );
                        }, 1000 * i * i);
                    } else {
                        log.info("Connected to database.");
                        resolve();
                    }
                }
            );
        });
    }
}

module.exports = DB;
