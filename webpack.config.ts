import * as path from 'path';
import { CheckerPlugin } from 'awesome-typescript-loader';
import { Configuration } from 'webpack';
const config: Configuration = {
  entry: {},
  output: {
    path: path.join(__dirname, 'public', '__compiled__'),
    filename: '[name].js'
  },
  target: 'web',
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  plugins: [
    new CheckerPlugin()
  ]
};

export default config;