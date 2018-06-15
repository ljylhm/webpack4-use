const path = require("path");
let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");

let envName = process.env.npm_lifecycle_event; // npm_lifecycle_event 是node环境自带的用来
let envPack = {
  isDev: envName.indexOf("dev") >= 0,
  isBuild: envName.indexOf("build") >= 0
}
module.exports = {
  entry: "./js/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js"
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
  // watch:{
  //   poll:1000,//监测修改的时间(ms)
  //   aggregeateTimeout:500, //防止重复按键，500毫米内算按键一次
  //   ignored:/node_modules/,//不监测
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ // 将css提取出来
          fallback: "style-loader",
          publicPath: "./",
          use: [{
            loader: "css-loader"
          }, {
            loader: "postcss-loader"
          }]
        })
      }, {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        use: [{
          loader: "file-loader",
          options: {
            limit: 8096,
            name: '[name].[ext]?[hash]',
            outputPath: "img/",
            // publicPath: "https://file.40017.cn/huochepiao/activity/20180501sweepCode/img"
          }
        }]
      }
    ]
  }
};

// plugins 是一个数组
// 区分开发环境和测试环境
module.exports.plugins = (module.exports.plugins || []).concat([
  new webpack.DefinePlugin({ // 定义全局变量
    'process.env': {
      curEnv: '"' + envName + '"'
    }
  }),
  new ExtractTextPlugin("main.css")
])





