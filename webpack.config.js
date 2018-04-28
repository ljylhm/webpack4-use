const path = require("path");
module.exports = {
    entry: "./js/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devtool: "inline-source-map",
    devServer: {
        host: "10.101.30.91",
        publicPath: "/dist/",
        port: "8080",
        inline: true,
        compress: true, // 打包的内容进行压缩
        hot: true
    }
}