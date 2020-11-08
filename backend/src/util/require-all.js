const path = require("path");
const fs = require("fs");

const log = require("./log");

const requireAll = (currentPath, extensions = [".js"]) => {
    const modules = [];

    if (!fs.existsSync(currentPath)) {
        return modules;
    }

    const stats = fs.statSync(currentPath);

    if (stats.isDirectory()) {
        const children = fs.readdirSync(currentPath);

        for (const child of children) {
            const childModules = requireAll(path.join(currentPath, child));

            for (const childModule of childModules) {
                modules.push(childModule);
            }
        }
    } else if (extensions.includes(path.extname(currentPath))) {
        try {
            const m = require(currentPath);
            modules.push(m);
        } catch (error) {
            log.error(`Could not require module "${currentPath}".`);
        }
    }

    return modules;
};

module.exports = requireAll;
