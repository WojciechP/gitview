var webpack = require('webpack');
// Webpack Plugins
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = {
  entry: {
    angular2: [
      'core-js',
      'rxjs',
      'zone.js',
      'reflect-metadata',
      'angular2/common',
      'angular2/core',
      'angular2/router',
      'angular2/http'
    ],
    app: './src/main/app.ts'
  },
  output: {
    path: '__build__',
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.html'],
    modulesDirectories: ['src/main', 'node_modules']
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: ['node_modules/']
      },
      { test: /\.html$/,  loader: 'raw' }
    ]
  },
  plugins: [
    new CommonsChunkPlugin({ name: 'angular2', filename: 'angular2.js', minChunks: Infinity }),
    new CommonsChunkPlugin({ name: 'common', filename: 'common.js' })
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: 'src/public',
    publicPath: '/__build__'
  }
};
