const webpack = require('webpack');
const path = require('path');

const vendorsPath = __dirname + '/vendor/';
const vendorsOrder = {
  'jquery': vendorsPath + 'jquery-3.1.1.slim.min.js',
  'tether': vendorsPath + 'tether.min.js',
  'bootstrap': vendorsPath + 'bootstrap.min.js',
  'validator': vendorsPath + 'validator.js',
}

module.exports = {
  entry: {
    app: './src/app.js',
    vendors: Object.keys(vendorsOrder),
  },
  output: {
    path: path.join(__dirname, '/static/js'),
    filename: "[name].bundle.js",
    publicPath: '/'
  },
  resolve: {
    alias: vendorsOrder
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', query: { presets: ['es2015']}},
      { test: require.resolve(vendorsOrder.tether), loader: 'expose-loader?Tether' },
      { test: require.resolve(vendorsOrder.jquery), loader: 'expose-loader?jQuery!expose-loader?$' },
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true, comments: false}),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.js",
      minChunks: Infinity,
    }),
  ],
};
