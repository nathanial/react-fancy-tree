const webpack = require('webpack');
module.exports = [
  {
    mode: 'development',
    entry: './src/example.jsx',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: './dist'
    },
    plugins: [
      new webpack.ProvidePlugin({
        "$":"jquery",
        "jQuery":"jquery",
        "window.jQuery":"jquery"
      })
    ]
  },
  {
    mode: 'production',
    entry: './src/index.js',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: './dist'
    },
    plugins: [
      new webpack.ProvidePlugin({
        "$":"jquery",
        "jQuery":"jquery",
        "window.jQuery":"jquery"
      })
    ]
  },
];
