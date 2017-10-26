const path = require('path')

module.exports = {
  entry: path.join(__dirname, 'src', 'client', 'main.js'),
  output: {
    path: path.join(__dirname, 'public', 'compiled'),
    filename: '[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}