/*
Webpack has a reputation of being much more complex and advanced than it actually is.
This is because if you aren't already familiar with what it's for and what the need for a tool like webpack is,
  it can seem overly complex and unnnecessary.
*/

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-')

module.exports= {
  entry: './index.js',    // Entry file
  output: {               // Output file
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {               // The transformations we want to do
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
}
