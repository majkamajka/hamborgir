module.exports = {
  entry: ['babel-polyfill', './src/App.jsx'],
  output: {
    filename: './src/out.js'
  },
  devServer: {
    inline: true,
    contentBase: './',
    port: 3001
  },
  watch: true,
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
        loader: "style-loader" // creates style nodes from JS strings
      }, {
        loader: "css-loader" // translates CSS into CommonJS
      }, {
        loader: "sass-loader" // compiles Sass to CSS
      }]
    },
    {
      test: /\.jsx$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2017', 'env', 'react'],
        }
      }
    },
    {
      test: /\.(png|jpe?g|gif|ttf)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            outputPath: "./bin/"
          }
        }
      ]
    }]
  }
}
