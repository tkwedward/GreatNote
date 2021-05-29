const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    // a. entry and output: tells our server what has to be compiled and from where. Also tells the server where the compiled version should be outputted.
    entry: "./src/index.ts",
    output: { path: path.join(__dirname, "build"), filename: "index.bundle.js" },

    // b. mode: this is the mode of our output, which is set to ‘development’ for now. Should be changed to 'production' when the app is build for production.
    mode: process.env.NODE_ENV || "development",

    // c. resolve: used so that we can import anything from the src folder in relative paths rather than the absolute ones, same goes for node_modules as well.
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },

    // d. devServer: this tells the webpack-dev-server what files are needed to be served. Everything from our src folder needs to be served (outputted) in the browser.
    devServer: { contentBase: path.join(__dirname, "src") },

    //
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: [/node_modules/, /mainPage.ts/],
                use: ["ts-loader"],
            },
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: ["file-loader", "url-loader"],
            }
        ],
    },

    // e. plugins: here we set what plugins we need in our app. As of this moment we only need the html-webpack-plugin which tells the server that the index.bundle.js should be injected (or added if you will) to our index.html file
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
            filename: 'index.html'
        }),
    ],
};
