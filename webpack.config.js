module.exports = {
  entry: [
    './src/app-to-dom.js'
  ],
  output: {
    path: __dirname + "/server/public/scripts/",
    publicPath: '/public/scripts',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  watch: true,
  devtool: 'cheap-module-source-map'
};
