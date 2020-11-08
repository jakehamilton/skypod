// @ts-check
const preactRefresh = require("@prefresh/vite");

/**
 * @type { import('vite').UserConfig }
 */
const config = {
    cors: true,
    emitManifest: true,
    jsx: {
        factory: "h",
        fragment: "Fragment",
    },
    plugins: [preactRefresh()],
    alias: {
        react: "preact/compat",
    },
};

module.exports = config;
