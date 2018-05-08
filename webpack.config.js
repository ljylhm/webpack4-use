const path = require("path");

module.exports = {
  entry: "./js/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  devtool: "inline-source-map",
  resolve: {
    //查找module的话从这里开始查找      
    //root: '', //绝对路径
    modules: ['./../', 'node_modules'],
    //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    extensions: ['.js', '.json', '.vue'],
    //模块别名定义，方便后续直接引用别名，无须多写长长的地址
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      '@': path.resolve(__dirname, './js'),
    }
  },
  devServer: {
    //host: "192.168.1.115",
    host: "10.101.30.91",
    publicPath: "/dist/",
    port: "8080",
    inline: true,
    open: true,
    compress: true, // 打包的内容进行压缩
    hot: true,
    proxy: {
      '/book/**': {
        target: 'http://10.101.30.91:3000',
        secure: false,
        changeOrigin: true
      }
    }
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


