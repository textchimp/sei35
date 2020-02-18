const path = require('path');

module.exports = {

  mode: 'development',   // Are we in development or production?
  entry: './src',        // Where are the source files to build?

  // Where to put the built output files:
  output: {
    path: path.join(__dirname, 'build'),  // i.e. current-folder/build
    filename: 'bundle.js'
  },

  // How to actually build the source files
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [
            ['transform-react-jsx'],
            ['transform-class-properties']
          ]
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  devServer: {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    historyApiFallback: true
  }

};
