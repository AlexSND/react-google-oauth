const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  entry: './src',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
    publicPath: '/dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
  ],
}

module.exports = config
