(function () {
    "use strict";

    const isDevBuild = process.argv.indexOf("--env.prod") < 0;

    module.exports = isDevBuild
        ? require("./config/webpack.dev")
        : require("./config/webpack.prod");
})();