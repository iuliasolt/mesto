const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/pages/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
      static: path.resolve(__dirname, 'dist'),
      open: true,
      compress: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        use: 'babel-loader',
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: '/node_modules/'
      },
      {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, {
        loader: 'css-loader',
        options: { importLoaders: 1 },
      }, 'postcss-loader']
    },
    {
      test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
      type: 'asset/resource'
    }
  ],
},
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin(
      {
        filename: "index.css"
      }
    ),
  ]
};
