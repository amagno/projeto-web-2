import * as path from 'path';
import { CheckerPlugin } from 'awesome-typescript-loader';
import { Configuration } from 'webpack';
const config: Configuration = {
  entry: path.join(__dirname, 'src', '__client__', 'main.ts'),
  output: {
    path: path.join(__dirname, 'public', '__compiled__'),
    filename: 'client_compiled.js'
  },
  target: 'web',
  resolve: {
    extensions: ['.ts']
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CheckerPlugin()
  ]
};

export default config;