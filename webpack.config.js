var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var copyConfig = [
  { from: 'src/index.html', to: 'public/' },
  { from: 'src/img', to: 'public/img'}
];


var env = process.env.NODE_ENV;

if (!env) {
  env = 'development';
}


module.exports = {
  entry: './src/js/main.js',
  output: {
    filename: './public/js/main.js'
  },
  plugins: [
    new CopyWebpackPlugin(copyConfig),
    new ExtractTextPlugin('public/css/site.css')
  ],
  module: {
    loaders: [
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader') }
    ]
  },
  devtool: env !== 'production' ? 'eval-source-map' : 'source-map'
};