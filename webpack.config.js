var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './entry.js',
  output: {
    filename: 'mobile-app/www/index.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, "app"),
        query:
          {
            presets:['react', 'es2015', 'stage-0']
          }
      },
      { test: /\.js?$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, "app"),
        query:
          {
            presets: ["es2015", "stage-0", "react"]
          }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['style-loader',
            'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]',
            'postcss-loader']
        }),
        include: [
          path.join(__dirname, './app/client/imports/components/clustering'),
          path.join(__dirname, './node_modules'),
        ],
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['style-loader',
            'css-loader', 'sass-loader']
        })
      },
      {
        test: /\.svg$/,
        loaders: ['url-loader?limit=7000'],
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('mobile-app/www/style/index.css')
  ],
};