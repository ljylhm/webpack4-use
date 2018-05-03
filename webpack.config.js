const path = require("path");
module.exports = {
  entry: "./js/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  devtool: "inline-source-map",
  devServer: {
    host: "192.168.1.115",
    publicPath: "/dist/",
    port: "8080",
    inline: true,
    open:true,
    compress: true, // 打包的内容进行压缩
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  }
};
