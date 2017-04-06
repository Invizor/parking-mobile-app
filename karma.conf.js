var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      'test/**/*.js'
    ],
    reporters: ['mocha'],
    autoWatch: true,
    colors: true,
    browsers: ['Chrome'],
    plugins: [
      'karma-chrome-launcher',
      'karma-webpack',
      'karma-mocha',
      'karma-chai',
    ],
    preprocessors: {
      'test/main.js': ['webpack']
    },
    webpack:
      {
        resolve: {
          extensions: ['*','.js', '.jsx', '.json']
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
            {
              test: /\.scss$/,
              loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
              })
            },
            {
              test: /\.sass$/,
              loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
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
        externals: {
          'react/addons': true,
          'react/lib/ExecutionEnvironment': true,
          'react/lib/ReactContext': true
        }
      },
  });
};